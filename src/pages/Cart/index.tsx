import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { formattedPrice } from '../../utils/format';
import { IState } from '../../store/index';
import { ICartItem } from '../../store/modules/cart/types';
import { updateProductQuantityRequest, removeProductFromCart } from '../../store/modules/cart/actions';
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

const Cart: React.FC = () => {
  const dispatch = useDispatch();

  const total = formattedPrice(useSelector<IState, ICartItem[]>(state => state.cart.items).reduce((total, { product, quantity }) => {
      return total + product.price * quantity;
  }, 0));

  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items).map(({ product, quantity }) => ({
    ...product,
    quantity,
    subtotal: formattedPrice(product.price * quantity)
  }));

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QUANTIDADE</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title}/>
              </td>
              <td>
                <strong>{product.title}</strong>
                {product.priceFormatted}
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => dispatch(updateProductQuantityRequest(product.id, product.quantity - 1))}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>

                  <input type="text" readOnly value={product.quantity} />
                  
                  <button type="button" onClick={() => dispatch(updateProductQuantityRequest(product.id, product.quantity + 1))}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button" onClick={() => dispatch(removeProductFromCart(product.id))}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button" onClick={() => {}}>
          Finalizar Pedido
        </button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
