import { FETCH_CATEGORIES, FETCH_PRODUCTS, FETCH_SPECIFIC_PRODUCTS, SAVE_STATIC_OFFERS } from "./actionType";

const InitialVal={
    categories:[],
    products:[],
    product:{},
    offerSection:{}
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
        case SAVE_STATIC_OFFERS:{
            return {
                ...state,
                offerSection:payload
            }
        }  
        default:
            return state
            break;
    }
}