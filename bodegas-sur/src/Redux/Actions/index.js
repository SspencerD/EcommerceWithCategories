import { getProductsAboveId, getProductsByCategory } from "../../Api/products";

export function addFavoriteProduct(payload) {
  return {
    type: "ADD_FAVORITE_PRODUCT",
    payload,
  };
}

export function removeFavoriteProduct(productId) {
  return {
    type: "REMOVE_FAVORITE_PRODUCT",
    payload: productId,
  };
}

export function getProducts(categoryId) {
  return function (dispatch) {
    return getProductsByCategory(categoryId).then((resp) => {
      dispatch({
        type: "GET_PRODUCTS",
        payload: resp.products,
      });
    });
  };
}

export function getProductbyId(productId) {
  return function (dispatch) {
    return getProductsAboveId(productId).then((resp) => {
      dispatch({
        type: "GET_PRODUCT_BY_ID",
        payload: resp,
      });
    });
  };
}
