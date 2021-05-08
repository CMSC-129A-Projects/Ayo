import {ActionTypes} from './constants';

export function setName(name) {
      return (
            {
                  type: ActionTypes.SET_NAME,
                  payload: name
            }
      )
}

export function setDescription(description) {
      return (
            {
                  type: ActionTypes.SET_DESCRIPTION,
                  payload: description 
            }
      )
}

export function setPrice(price) {
      return (
            {
                  type: ActionTypes.SET_PRICE,
                  payload: price 
            }
      )
}

export function setInStock(in_stock) {
      return (
            {
                  type: ActionTypes.SET_IN_STOCK,
                  payload: in_stock 
            }
      )
}

export function setProductImg(product_img) {
      return (
            {
                  type: ActionTypes.SET_PRODUCT_IMG,
                  payload: product_img 
            }
      )
}