import {ActionTypes} from './constants';
import { fetchProducts } from './services';

export const setProductsList = (jwt_access, jwt_refresh) => async (dispatch, getState) => {
      console.log("INSIDE PRODUCTSLIST");
      const products_list = await fetchProducts(jwt_access, jwt_refresh);
      dispatch(
            {
                  type: ActionTypes.SET_PRODUCTS_LIST,
                  payload: products_list 
            }
      )
}
export function setId(id) {
      return (
            {
                  type: ActionTypes.SET_ID,
                  payload: id 
            }
      )
}


export function setName(name) {
      return (
            {
                  type: ActionTypes.SET_NAME,
                  payload: name
            }
      )
}

export function setDescription(description) {
      return (
            {
                  type: ActionTypes.SET_DESCRIPTION,
                  payload: description 
            }
      )
}

export function setPrice(price) {
      return (
            {
                  type: ActionTypes.SET_PRICE,
                  payload: price 
            }
      )
}

export function setInStock(in_stock) {
      return (
            {
                  type: ActionTypes.SET_IN_STOCK,
                  payload: in_stock 
            }
      )
}

export function setProductImg(product_img) {
      return (
            {
                  type: ActionTypes.SET_PRODUCT_IMG,
                  payload: product_img 
            }
      )
}