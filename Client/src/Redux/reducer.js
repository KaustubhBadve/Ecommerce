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
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REMOVE_FROM_CART,
  SIGNUP_SUCCESS,
} from "./actionType";
import Cookies from "js-cookie";

let userToken = Cookies.get("currentUser")
  ? JSON.parse(Cookies.get("currentUser")).token
  : "";

let userName = Cookies.get("currentUser")
  ? JSON.parse(Cookies.get("currentUser")).name
  : "";

const InitialVal = {
  categories: [],
  products: [],
  product: {},
  organisedProducts: {},
  userName: userName,
  token: userToken,
  wishListItem: [],
  cart: [],
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
};

export const Reducer = (state = InitialVal, { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES: {
      return {
        ...state,
        categories: [...payload],
      };
    }
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: [...payload],
      };
    }
    case FETCH_SPECIFIC_PRODUCTS: {
      return {
        ...state,
        product: payload,
      };
    }
    case FETCH_DATA_CATEGORY_WISE: {
      return {
        ...state,
        organisedProducts: payload,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        token: payload.token,
        userName: payload.user,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        token: payload.token,
        userName: payload.name,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        token: "",
        userName: "",
      };
    }
    case FETCH_WISHLIST: {
      return {
        ...state,
        wishListItem: payload,
      };
    }
    case ADD_TO_WISHLIST: {
      const id = payload;
      const updatedOrganisedProducts = toggleFavouriteForOrganisedProducts(
        state.organisedProducts,
        id
      );
      const products = toggleFavouriteForProduct(state.products, id);

      const product = state.product;

      if (product.hasOwnProperty("isFavourate")) {
        product.isFavourate = !product.isFavourate;
      }

      const wishList =
        state?.wishListItem && state?.wishListItem?.length > 0
          ? state?.wishListItem?.filter((item) => item.id !== id)
          : [];
      return {
        ...state,
        organisedProducts: updatedOrganisedProducts,
        products,
        product: { ...product },
        wishListItem: wishList,
      };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cart: payload,
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: payload,
      };
    }
    case FETCH_FROM_CART: {
      return {
        ...state,
        cart: payload,
      };
    }
    case ADD_TOTALS: {
      console.log("payloadpayload",payload);
      return {
        ...state,
        cartTotalPrice:payload?.totalPrice,
        cartTotalDiscount:payload?.totalDiscount
      };
    }
    default:
      return state;
      break;
  }
};

const toggleFavouriteForOrganisedProducts = (data, id) => {
  for (const category in data) {
    for (const brand in data[category]) {
      const item = data[category][brand].find((product) => product.id === id);
      if (item) {
        item.isFavourate = !item.isFavourate;
        break;
      }
    }
  }
  return data;
};

const toggleFavouriteForProduct = (products, id) => {
  for (const product of products) {
    if (product.id === id) {
      product.isFavourate = !product.isFavourate;
      break;
    }
  }
  return products;
};
