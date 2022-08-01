const initialState = {
  favoriteProducts: [],
  productLoaded: [],
  productDetail: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === "ADD_FAVORITE_PRODUCT") {
    return {
      ...state,
      favoriteProducts: state.favoriteProducts.concat(action.payload),
    };
  }
  if (action.type === "REMOVE_FAVORITE_PRODUCT") {
    return {
      ...state,
      favoriteProducts: state.favoriteProducts.filter(
        (item) => item.id !== action.payload
      ),
    };
  }
  if (action.type === "GET_PRODUCTS") {
    return {
      ...state,
      productLoaded: action.payload,
    };
  }

  if (action.type === "GET_PRODUCT_BY_ID") {
    return {
      ...state,
      productDetail: action.payload,
    };
  }
}
export default rootReducer;
