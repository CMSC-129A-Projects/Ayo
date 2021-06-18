/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      products_list: [],
      id : '',
      name: '',
      description : '',
      price : 0,
      quantity : 0,
      product_img : null,
      generic_name : ''
}

export default function signupScreenReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_PRODUCTS_LIST:
                  return {...state, products_list:action.payload}
            case ActionTypes.SET_ID:
                  return {...state, id:action.payload}
            case ActionTypes.SET_NAME:
                  return {...state, name:action.payload}
            case ActionTypes.SET_DESCRIPTION:
                  return {...state, description:action.payload}
            case ActionTypes.SET_PRICE:
                  return {...state, price :action.payload}
            case ActionTypes.SET_QUANTITY:
                  return {...state, quantity:action.payload}
            case ActionTypes.SET_PRODUCT_IMG:
                  return {...state, product_img :action.payload}
            case ActionTypes.SET_GENERIC_NAME:
                  return {...state, generic_name:action.payload}
            default:
                  return state;
      }
}
