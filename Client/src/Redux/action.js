import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  FETCH_CATEGORIES,
  FETCH_DATA_CATEGORY_WISE,
  FETCH_FROM_CART,
  FETCH_PRODUCTS,
  FETCH_SPECIFIC_PRODUCTS,
  FETCH_WISHLIST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REMOVE_FROM_CART,
  SIGNUP_SUCCESS,
} from "./actionType";
import Cookies from "js-cookie";

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
export const getProductList =
  (category, rating, brand, discount, priceMin, priceMax) => (dispatch) => {
    try {

      let userId = JSON.parse(Cookies.get("currentUser")).id;

      let url = `http://localhost:3033/api/getProduct`;
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
        ? `http://localhost:3033/api/getProduct/${id}?userId=${userId}`
        : `http://localhost:3033/api/getProduct/${id}`;
  
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
        ? `http://localhost:3033/api/getallproducts?userId=${userId}`
        : `http://localhost:3033/api/getallproducts`;
  
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
   
    await fetch(`http://localhost:3033/api/addtowishlist/${id}`, {
      method: "post",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: ADD_TO_WISHLIST });
      });
  } catch (error) {
    console.log(error);
  }
};

export const getWishListedItems = () => async (dispatch) => {
  try {
    let userToken = JSON.parse(Cookies.get("currentUser")).token;

    console.log("userToken", userToken);

    await fetch(`http://localhost:3033/api/wishlisteditems`, {
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
   console.log("id",id);
    await fetch(`http://localhost:3033/api/addtocart/${id}`, {
      method: "post",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("eeeee",data.data);
        dispatch({ type: ADD_TO_CART ,payload:data?.data});
      });
  } catch (error) {
    console.log(error);
  }
};

export const getCartItems = () => async (dispatch) => {
  try {
    let userToken = JSON.parse(Cookies.get("currentUser")).token;

    console.log("userToken", userToken);

    await fetch(`http://localhost:3033/api/cartitems`, {
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

    console.log("userToken", userToken);

    await fetch(`http://localhost:3033/api/removefromcart/${id}`, {
      method: "post",
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data?.data);
        dispatch({ type: REMOVE_FROM_CART, payload: data?.data });
      });
  } catch (error) {
    console.log(error);
  }
};