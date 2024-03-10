import useSelection from "antd/es/table/hooks/useSelection"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWishListedItems } from "../../Redux/action"
import {ProductList} from "../Products/ProductList"
import { SideBar } from "./SideBar"

export const WishList = ()=>{
    const {wishListItem}=useSelector((state)=>state?.mainReducer)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getWishListedItems())
    },[])

    return (
        <div>
            <h3>My Wishlist ({wishListItem?.length || 0})</h3>
            <div className="filterComponent" style={{display:"flex"}}>
            <SideBar/>
            <ProductList productList={wishListItem} wishList={1}/>
            </div>
           
        </div>
    )
}