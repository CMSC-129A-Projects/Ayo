/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      id : '',
      name : '',
      frequency : '',
      quantity_to_take: 0,
      quantity_to_buy: 0,
      first_dose : '',
      is_ongoing: false,
      customer_id : '',
      prescription_id : '',
}


export default function medicineRecordReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_NAME:
                  return {...state, name :action.payload}
            case ActionTypes.SET_FREQUENCY:
                  return {...state, product_id :action.payload}
            case ActionTypes.SET_CUSTOMER_ID:
                  return {...state, customer_id :action.payload}
            case ActionTypes.SET_QUANTITY_TO_TAKE:
                  return {...state, quantity_to_take:action.payload}
            case ActionTypes.SET_QUANTITY_TO_BUY:
                  return {...state, quantity_to_buy:action.payload}
            case ActionTypes.SET_FIRST_DOSE:
                  return {...state, first_dose:action.payload}
            case ActionTypes.SET_IS_ONGOING:
                  return {...state, is_ongoing:action.payload}
            default:
                  return state;
      }
}
