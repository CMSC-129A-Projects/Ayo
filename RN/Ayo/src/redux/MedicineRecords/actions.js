import {ActionTypes} from './constants';

export function setCustomerId(customer_id){
      return (
            {
                  type: ActionTypes.SET_CUSTOMER_ID,
                  payload: customer_id 
            }
      )
}

export function setFrequency(frequency) {
      return (
            {
                  type: ActionTypes.SET_FREQUENCY,
                  payload:frequency 
            }
      )
}

export function setQuantityToTake(quantity_to_take) {
      return (
            {
                  type: ActionTypes.SET_QUANTITY_TO_TAKE,
                  payload: quantity_to_take 
            }
      )
}

export function setQuantityToBuy(quantity_to_buy) {
      return (
            {
                  type: ActionTypes.SET_QUANTITY_TO_BUY,
                  payload: quantity_to_buy
            }
      )
}

export function setFirstDose(first_dose) {
      return (
            {
                  type: ActionTypes.SET_FIRST_DOSE,
                  payload: first_dose 
            }
      )
}

export function setIsOngoing(is_ongoing) {
      return (
            {
                  type: ActionTypes.SET_IS_ONGOING,
                  payload: is_ongoing 
            }
      )
}