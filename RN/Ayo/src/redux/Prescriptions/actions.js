import {ActionTypes} from './constants';

export function setCustomerId(customer_id){
      return (
            {
                  type: ActionTypes.SET_CUSTOMER_ID,
                  payload: customer_id 
            }
      )
}

export function setStartingDate(starting_date) {
      return (
            {
                  type: ActionTypes.SET_STARTING_DATE,
                  payload:starting_date 
            }
      )
}

export function setPrescriptionPhoto(prescription_photo) {
      return (
            {
                  type: ActionTypes.SET_PRESCRIPTION_PHOTO,
                  payload: prescription_photo 
            }
      )
}

export function setPrescriptionCopy(prescription_copy) {
      return (
            {
                  type: ActionTypes.SET_PRESCRIPTION_COPY,
                  payload:prescription_copy 
            }
      )
}

export function setIsFinished(is_finished) {
      return (
            {
                  type: ActionTypes.SET_IS_FINISHED,
                  payload:is_finished 
            }
      )
}