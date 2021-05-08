import {createSelector} from 'reselect';

// needs to be the same in store.js
const productScreenState = (state) => state.productScreen;

export const getSelectProduct = createSelector(
      productScreenState,
      (productScreen) => productScreen 
)

// what to pass here?
export const getName = createSelector (
      productScreenState,
      (productScreenState) => productScreenState.name
)

export const getDescription = createSelector(
      productScreenState,
      (productScreenState) => productScreenState.description
)

export const getPrice = createSelector(
      productScreenState,
      (productScreenState) => productScreenState.price
)

export const getInStock = createSelector(
      productScreenState,
      (productScreenState) => productScreenState.in_stock
)

export const getProductImg = createSelector(
      productScreenState,
      (productScreenState) => productScreenState.product_img
)