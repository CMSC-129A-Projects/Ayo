/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      id : '',
      generic_name : '',
      disease: [],
}


export default function orderItemsReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_GENERIC_NAME:
                  return {...state, generic_name:action.payload}
            case ActionTypes.SET_DISEASE:
                  return {...state, disease :action.payload}
            default:
                  return state;
      }
}
