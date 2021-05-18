/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      id : '',
      customer_id : '',
      starting_date: '',
      prescription_photo : null,
      prescription_copy : null,
      is_finished : false,
      // no need to change quantity here since it is assured nga final na ang data
      contents : null,
}


export default function OrderReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_CUSTOMER_ID:
                  return {...state, customer_id :action.payload}
            case ActionTypes.SET_STARTING_DATE:
                  return {...state, starting_date:action.payload}
            case ActionTypes.SET_PRESCRIPTION_PHOTO:
                  return {...state, prescription_photo:action.payload}
            case ActionTypes.SET_PRESCRIPTION_COPY:
                  return {...state, prescription_copy:action.payload}
            case ActionTypes.SET_IS_FINISHED:
                  return {...state, is_finished:action.payload}
            default:
                  return state;
      }
}
