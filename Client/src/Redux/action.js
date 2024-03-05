import {
  FETCH_CATEGORIES,
  FETCH_PRODUCTS,
  FETCH_SPECIFIC_PRODUCTS,
  SAVE_STATIC_OFFERS,
} from "./actionType";

export const getCategoris = () => (dispatch) => {
  try {
    fetch(`http://localhost:3033/api/categorylist`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_CATEGORIES, payload: data?.data });
      });
  } catch (error) {
    console.log(error);
  }
};

export const getProductList = () => (dispatch) => {
  try {
    fetch(`http://localhost:3033/api/getProduct`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_PRODUCTS, payload: data?.data?.temp?.data });
      });
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = (id) => (dispatch) => {
  try {
    fetch(`http://localhost:3033/api/getProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_SPECIFIC_PRODUCTS, payload: data?.data?.data });
      });
  } catch (error) {
    console.log(error);
  }
};

export const saveStaticOffer = (offers) => (dispatch) => {
  try {
    dispatch({ type: SAVE_STATIC_OFFERS, payload: offers });
  } catch (error) {
    console.log(error);
  }
};
