import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCartItems } from "../../Redux/action"
import { ProductList } from "../Products/ProductList"
import { ProductInCart } from "./ProductInCart"
import { SideBar } from "./SideBar"

export const Cart=()=>{
    const {cart}=useSelector((state)=>state?.mainReducer)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getCartItems())
    },[])
    return (
        <div>
            <h3>My Cart ({cart?.length || 0})</h3>
            <div className="filterComponent" style={{display:"flex"}}>
            <ProductInCart productList={cart} wishList={1}/>
            </div>
        </div>
    )
}