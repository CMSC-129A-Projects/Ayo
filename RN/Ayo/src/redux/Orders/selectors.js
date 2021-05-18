import {createSelector} from 'reselect';

// needs to be the same in store.js
const Order = (state) => state.orderData;

export const getOrder = createSelector(
      Order,
      (orderData) => orderData 
)

//  this is the only explicit rendering of values
export const getNote= createSelector(
      Order,
      (Order) => Order.note
)