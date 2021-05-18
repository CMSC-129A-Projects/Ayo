import {ActionTypes} from './constants';

export function setUserId(user_id){
      return (
            {
                  type: ActionTypes.SET_USER_ID,
                  payload: user_id 
            }
      )
}

export function setProductId(product_id) {
      return (
            {
                  type: ActionTypes.SET_PRODUCT_ID,
                  payload:product_id 
            }
      )
}

export function setQuantity(quantity) {
      return (
            {
                  type: ActionTypes.SET_QUANTITY,
                  payload: quantity 
            }
      )
}