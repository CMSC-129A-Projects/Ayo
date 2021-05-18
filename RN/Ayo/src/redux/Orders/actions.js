import {ActionTypes} from './constants';

export function setIsConfirmed(is_confirmed){
      return (
            {
                  type: ActionTypes.SET_IS_CONFIRMED,
                  payload: is_confirmed 
            }
      )
}

export function setIsCancelled(is_cancelled) {
      return (
            {
                  type: ActionTypes.SET_IS_CANCELLED,
                  payload:is_cancelled 
            }
      )
}

export function setPassword(is_fulfilled) {
      return (
            {
                  type: ActionTypes.SET_IS_FULFILLED,
                  payload: is_fulfilled 
            }
      )
}

export function setPasswordConfirm(request_type) {
      return (
            {
                  type: ActionTypes.SET_REQUEST_TYPE,
                  payload:request_type 
            }
      )
}

export function setJWTRefresh(note) {
      return (
            {
                  type: ActionTypes.SET_NOTE,
                  payload:note 
            }
      )
}