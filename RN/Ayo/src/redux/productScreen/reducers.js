/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      name: '',
      description : '',
      price : 0,
      in_stock : false,
      product_img : null,
}


export default function signupScreenReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_NAME:
                  return {...state, name:action.payload}
            case ActionTypes.SET_DESCRIPTION:
                  return {...state, description:action.payload}
            case ActionTypes.SET_PRICE:
                  return {...state, price :action.payload}
            case ActionTypes.SET_IN_STOCK:
                  return {...state, in_stock :action.payload}
            case ActionTypes.SET_PRODUCT_IMG:
                  return {...state, product_img :action.payload}
            default:
                  return state;
      }
}
