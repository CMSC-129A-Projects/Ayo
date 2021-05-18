/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      id : '',
      customer_id : '',
      is_confirmed : false,
      is_cancelled : false,
      is_fulfilled : false,
      request_date : '',
      request_type : '',
      total_cost : 0,
      prescription_id: '',
      note : '',
      // no need to change quantity here since it is assured nga final na ang data
      contents : null,
}


export default function OrderReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_IS_CONFIRMED:
                  return {...state, username:action.payload}
            case ActionTypes.SET_IS_CANCELLED:
                  return {...state, password:action.payload}
            case ActionTypes.SET_IS_FULFILLED:
                  return {...state, password_confirm:action.payload}
            case ActionTypes.SET_REQUEST_TYPE:
                  return {...state, JWT_REFRESH :action.payload}
            case ActionTypes.SET_NOTE:
                  return {...state, JWT_ACCESS :action.payload}
            default:
                  return state;
      }
}
