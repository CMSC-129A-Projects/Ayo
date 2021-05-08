/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      username : '',
      password : '',
      JWT : '',
      name: '',
      new_password: '',
      contact_number: '',
      address: '',
      role: '',
      valid_id1: null,
      business_permit: null,
      medical_license: null,
}


export default function loginScreenReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_USER:
                  return {...state, 
                        username:action.payload.username,
                        password:action.payload.password,
                        address:action.payload.address,
                        contact_number:action.payload.contact_number,
                        role:action.payload.role,
                        valid_id1:action.payload.valid_id1,
                        business_permit:action.payload.business_permit,
                        medical_license:action.payload.medical_license,
                  }
            case ActionTypes.SET_USERNAME:
                  return {...state, username:action.payload}
            case ActionTypes.SET_PASSWORD:
                  return {...state, password:action.payload}
            case ActionTypes.SET_JWT:
                  return {...state, JWT :action.payload}
            case ActionTypes.SET_NAME:
                  return {...state, name:action.payload}
            case ActionTypes.SET_NEW_PASSWORD:
                  return {...state, new_password:action.payload}
            case ActionTypes.SET_CONTACT_NUMBER:
                  return {...state, contact_number:action.payload}
            case ActionTypes.SET_ADDRESS:
                  return {...state, address:action.payload}
            case ActionTypes.SET_ROLE:
                  return {...state, role:action.payload}
            case ActionTypes.SET_VALID_ID:
                  return {...state, valid_id1:action.payload}
            case ActionTypes.SET_BUSINESS_PERMIT:
                  return {...state, business_permit:action.payload}
            case ActionTypes.SET_MEDICAL_LICENSE:
                  return {...state, medical_license:action.payload}
            default:
                  return state;
      }
}
