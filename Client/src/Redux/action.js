import {
  FETCH_CATEGORIES,
  FETCH_DATA_CATEGORY_WISE,
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
export const getProductList = (category, rating, brand,discount) => (dispatch) => {
  try {
    let url = `http://localhost:3033/api/getProduct`;
    let queryParams = [];

    if (category) {
      queryParams.push(`category=${category}`);
    }
    if (rating) {
      queryParams.push(`rating=${rating}`);
    }
    if (brand) {
      queryParams.push(`brand=${brand}`);
    }
    if (discount) {
      queryParams.push(`discount=${discount}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
    
  
    fetch(url)
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

export const getDataGroupWise = () => (dispatch) => {
  try {

    fetch(`http://localhost:3033/api/getallproducts`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: FETCH_DATA_CATEGORY_WISE, payload: data.data.result });
    });

    
  } catch (error) {
    console.log(error);
  }
};