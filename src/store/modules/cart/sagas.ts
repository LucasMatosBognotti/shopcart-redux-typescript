import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  addProductToCartRequest,
  addProductToCartSuccess,
  updateProductQuantitySuccess,
  updateProductQuantityRequest,
} from './actions';
import { ActionTypes } from './types';
import { IState } from '../../index';
import api from '../../../services/api';
import { AxiosResponse } from 'axios';
import { formattedPrice } from '../../../utils/format';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

type UpdateQuantityProduct = ReturnType<typeof updateProductQuantityRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  priceFormatted: string;
}


function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { productId } = payload;

  const productExist:Product  = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === productId);
  });

  const stock: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${productId}`);

  const stockQuantity = stock.data.quantity;
  const currentQuantity = productExist ? productExist.quantity : 0;

  const quantity = currentQuantity + 1;

  if (quantity > stockQuantity) {
    toast.error('Número máximo de produtos em estoque atingido');
    return;
  }

  if (productExist) {
    yield put(updateProductQuantitySuccess(productId, quantity));
  } else {
    const response: AxiosResponse<Product> = yield call(api.get, `products/${productId}`);
    
    const product = {
      ...response.data,
      quantity: 1,
      priceFormatted: formattedPrice(response.data.price)
    }

    yield put(addProductToCartSuccess(product));
  }
}

function* updateQuantity({ payload }: UpdateQuantityProduct){
  const { productId, quantity } = payload;

  console.log({
    productId, quantity
  });

  if (quantity <= 0) return;

  const stock: AxiosResponse<IStockResponse> = yield call(api.get, `/stock/${productId}`);
  const stockQuantity = stock.data.quantity;

  if (quantity > stockQuantity) {
    toast.error('Número máximo de produtos em estoque atingido');
    return;
  }

  yield put(updateProductQuantitySuccess(productId, quantity));
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
  takeLatest(ActionTypes.updateProductQuantityRequest, updateQuantity)
]);