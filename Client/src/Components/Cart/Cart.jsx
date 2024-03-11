import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCartItems } from "../../Redux/action"
import { ProductInCart } from "./ProductInCart"

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
            <ProductInCart productList={cart} />
            </div>
        </div>
    )
}