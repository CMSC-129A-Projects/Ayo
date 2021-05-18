import {ActionTypes} from './constants';

export function setGenericName(generic_name){
      return (
            {
                  type: ActionTypes.SET_GENERIC_NAME,
                  payload: generic_name 
            }
      )
}

export function setDisease(disease) {
      return (
            {
                  type: ActionTypes.SET_DISEASE,
                  payload: disease
            }
      )
}