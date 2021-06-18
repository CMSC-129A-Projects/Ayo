import {ActionTypes} from './constants';

export function setRequest(req){
      return (
            {
                  type: ActionTypes.SET_REQUEST,
                  payload: req 
            }
      )
}


export function setRequestList(req){
      return (
            {
                  type: ActionTypes.SET_REQUEST_LIST,
                  payload: req 
            }
      )
}


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