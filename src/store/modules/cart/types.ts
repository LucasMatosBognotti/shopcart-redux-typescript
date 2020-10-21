export enum ActionTypes {
  addProductToCartRequest = 'ADD_PRODUCT_TO_CART_REQUEST',
  addProductToCartSuccess = 'ADD_PRODUCT_TO_CART_SUCCESS',
  
  removeProductFromCart = 'REMOVE_PRODUCT_FROM_CART',
  
  updateProductQuantityRequest = 'UPDADE_PRODUCT_QUANTITY_REQUEST',
  updateProductQuantitySuccess = 'UPDADE_PRODUCT_QUANTITY_SUCCESS',
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  priceFormatted: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
  failedStockCheck: number[];
}
