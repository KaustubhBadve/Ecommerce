import { FETCH_CATEGORIES, FETCH_DATA_CATEGORY_WISE, FETCH_PRODUCTS, FETCH_SPECIFIC_PRODUCTS, FETCH_WISHLIST, LOGIN_SUCCESS, LOGOUT_SUCCESS, SAVE_STATIC_OFFERS, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "./actionType";
import Cookies from "js-cookie";

let userToken = Cookies.get("currentUser")
  ? JSON.parse(Cookies.get("currentUser")).token
  : "";

let userName = Cookies.get("currentUser")
  ? JSON.parse(Cookies.get("currentUser")).name
  : "";

const InitialVal={
    categories:[],
    products:[],
    product:{},
    organisedProducts:{},
    userName: userName,
    token:userToken,
    wishListItem:[]
}

export const Reducer=(state=InitialVal,{type,payload})=>{
    switch (type) {
        case FETCH_CATEGORIES:{
            return {
                ...state,
                categories:[...payload]
            }
        }
        case FETCH_PRODUCTS:{
            return {
                ...state,
                products:[...payload]
            }
        }   
        case FETCH_SPECIFIC_PRODUCTS:{
            return {
                ...state,
                product:payload
            }
        }   
        case FETCH_DATA_CATEGORY_WISE:{
            return {
                ...state,
                organisedProducts:payload
            }
        }

        case LOGIN_SUCCESS:{
            return {
                ...state,
                product:payload
            }
        }   
        case SIGNUP_SUCCESS:{
            return {
                ...state,
                token:payload.token,
                user:payload.user
            }
        }
        case LOGOUT_SUCCESS:{
            return {
                ...state,
                token:"",
                userName:""
            }
        }
        case FETCH_WISHLIST:{
            console.log("payload in wishreducer",payload);
            return {
                ...state,
                wishListItem:payload
            }
        }
        default:
            return state
            break;
    }
}