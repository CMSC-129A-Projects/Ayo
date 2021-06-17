/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      request_list: [],
      id : '',
      user_id : '',
      request_id : '',
      product_id : '',
      cost: 0,
      quantity: 0,
}


export default function orderItemsReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_REQUEST_LIST:
                  return {...state, request_list:action.payload}
            case ActionTypes.SET_PRODUCT_ID:
                  return {...state, product_id :action.payload}
            case ActionTypes.SET_USER_ID:
                  return {...state, user_id :action.payload}
            case ActionTypes.SET_QUANTITY:
                  return {...state, quantity:action.payload}
            default:
                  return state;
      }
}
