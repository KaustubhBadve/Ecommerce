import {
  ADD_TOTALS,
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  FETCH_CATEGORIES,
  FETCH_DATA_CATEGORY_WISE,
  FETCH_FROM_CART,
  FETCH_PRODUCTS,
  FETCH_SPECIFIC_PRODUCTS,
  FETCH_WISHLIST,
  LOGOUT_SUCCESS,
  REMOVE_FROM_CART,
  SIGNUP_SUCCESS,
} from "./actionType";
import Cookies from "js-cookie";
import { BASE_URL } from "../Config.js/AppConfig";

export const getCategoris = () => (dispatch) => {
  try {
    fetch(`${BASE_URL}/api/categorylist`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_CATEGORIES, payload: data?.data });
      });
  } catch (error) {
    console.log(error);
  }
};
export const getProductList =
  (category, rating, brand, discount, priceMin, priceMax) => (dispatch) => {
    try {
      let currentUser = Cookies.get("currentUser");
      let userId = currentUser ? JSON.parse(currentUser).id : null;

      let url = `${BASE_URL}/api/getProduct`;
      let queryParams = [];

      if (category) {
        queryParams.push(`category=${category}`);
      }
      if (userId) {
        queryParams.push(`userId=${userId}`);
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
      if (priceMin) {
        queryParams.push(`priceMin=${priceMin}`);
      }
      if (priceMax) {
        queryParams.push(`priceMax=${priceMax}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      console.log("url", url);

      console.log("queryParams", queryParams);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: FETCH_PRODUCTS,
            payload: data?.data?.temp?.data || [],
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

export const getProduct = (id) => (dispatch) => {
  try {
    const currentUser = Cookies.get("currentUser");
    let userId = currentUser ? JSON.parse(currentUser).id : null;

    const url = userId
      ? `${BASE_URL}/api/getProduct/${id}?userId=${userId}`
      : `${BASE_URL}/api/getProduct/${id}`;

    fetch(url)
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
    const currentUser = Cookies.get("currentUser");
    let userId = currentUser ? JSON.parse(currentUser).id : null;

    const url = userId
      ? `${BASE_URL}/api/getallproducts?userId=${userId}`
      : `${BASE_URL}/api/getallproducts`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_DATA_CATEGORY_WISE, payload: data.data.result });
      });
  } catch (error) {
    console.log(error);
  }
};

export const userSignup = (data) => (dispatch) => {
  try {
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT_SUCCESS });
    Cookies.remove("currentUser");
  } catch (error) {
    console.log(error);
  }
};

export const addToWishList = (id) => async (dispatch) => {
  try {
    let userToken = JSON.parse(Cookies.get("currentUser")).token;

    await fetch(`${BASE_URL}/api/addtowishlist/${id}`, {
      method: "post",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: ADD_TO_WISHLIST, payload: id });
      });
  } catch (error) {
    console.log(error);
  }
};

export const getWishListedItems = () => async (dispatch) => {
  try {
    let userToken = JSON.parse(Cookies.get("currentUser")).token;

    console.log("userToken", userToken);

    await fetch(`${BASE_URL}/api/wishlisteditems`, {
      method: "get",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data?.data);
        dispatch({ type: FETCH_WISHLIST, payload: data?.data });
      });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = (id) => async (dispatch) => {
  try {
    let userToken = JSON.parse(Cookies.get("currentUser")).token;
    console.log("id", id);
    await fetch(`${BASE_URL}/api/addtocart/${id}`, {
      method: "post",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("eeeee", data.data);
        dispatch({ type: ADD_TO_CART, payload: data?.data });
      });
  } catch (error) {
    console.log(error);
  }
};

export const getCartItems = () => async (dispatch) => {
  try {
    let userToken = JSON.parse(Cookies.get("currentUser")).token;

    console.log("userToken", userToken);

    await fetch(`${BASE_URL}/api/cartitems`, {
      method: "get",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data?.data);
        dispatch({ type: FETCH_FROM_CART, payload: data?.data });
      });
  } catch (error) {
    console.log(error);
  }
};

export const reomveCartItems = (id) => async (dispatch) => {
  try {
    let userToken = JSON.parse(Cookies.get("currentUser")).token;

    await fetch(`${BASE_URL}/api/removefromcart/${id}`, {
      method: "post",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: REMOVE_FROM_CART, payload: data?.data });
      });
  } catch (error) {
    console.log(error);
  }
};

export const addTotals = (data) => (dispatch) => {
  try {
    console.log("datadata", data);
    dispatch({ type: ADD_TOTALS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
