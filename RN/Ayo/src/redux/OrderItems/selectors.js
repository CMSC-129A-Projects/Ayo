import {createSelector} from 'reselect';

// needs to be the same in store.js
const orderItem = (state) => state.orderItemData;

export const getOrderItem = createSelector(
      orderItem,
      (orderItemData) => orderItemData 
)

//  this is the only explicit rendering of values
export const getQuantity= createSelector(
      orderItem,
      (orderItem) => orderItem.quantity
)