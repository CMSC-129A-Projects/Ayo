import {createSelector} from 'reselect';

// needs to be the same in store.js
const Product = (state) => state.productData;

export const getSelectProduct = createSelector(
      Product,
      (productData) => productData
)

// what to pass here?
export const getName = createSelector (
      Product,
      (Product) => Product.name
)

export const getDescription = createSelector(
      Product,
      (Product) => Product.description
)

export const getPrice = createSelector(
      Product,
      (Product) => Product.price
)

export const getQuantity = createSelector(
      Product,
      (Product) => Product.quantity
)

export const getProductImg = createSelector(
      Product,
      (Product) => Product.product_img
)

export const getGenericName= createSelector(
      Product,
      (Product) => Product.generic_name
)