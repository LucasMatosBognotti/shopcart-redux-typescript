import { IProduct, ActionTypes } from './types';

export function addProductToCartRequest(productId: number) {
  return {
    type: ActionTypes.addProductToCartRequest,
    payload: {
      productId,
    }
  }
}

export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartSuccess,
    payload: {
      product,
    }
  }
}

export function updateProductQuantityRequest(productId: number, quantity: number) {
  return {
    type: ActionTypes.updateProductQuantityRequest,
    payload: {
      productId,
      quantity,
    }
  }
}

export function updateProductQuantitySuccess(productId: number, quantity: number) {
  return {
    type: ActionTypes.updateProductQuantitySuccess,
    payload: {
      productId,
      quantity
    }
  }
}

export function removeProductFromCart(productId: number) {
  return {
    type: ActionTypes.removeProductFromCart,
    payload: {
      productId,
    }
  }
}