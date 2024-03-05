import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FooterFrontPage } from "../Components/Footer/FooterFrontPage"
import FrontPageNavbar from "../Components/Navbar/FrontPageNavbar"
import { NavbarCategories } from "../Components/Navbar/NavbarCategories"
import { FilterSideBar } from "../Components/Products/FilterSideBar"
import { ProductList } from "../Components/Products/ProductList"
import { getProductList } from "../Redux/action"

export const ProductListing =()=>{
    const dispatch=useDispatch()
    const {products}=useSelector((state)=>state?.mainReducer)
    useEffect(()=>{
     dispatch(getProductList())
    },[])
    return (
        <div>
            <FrontPageNavbar/>
            <NavbarCategories/>
            <div className="productsListingPage">
            <FilterSideBar/>
            <ProductList productList={products}/>
            </div>
            <FooterFrontPage/>
        </div>
    )
}