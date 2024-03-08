import { useDispatch, useSelector } from "react-redux"
import { FilterSideBar } from "../Components/Filters/FilterSideBar"
import { ProductList } from "../Components/Products/ProductList"

export const ProductListing =()=>{
    const dispatch=useDispatch()
    const {products}=useSelector((state)=>state?.mainReducer)

    return (
            <div className="productsListingPage">
            <FilterSideBar/>
            <ProductList productList={products}/>
            </div>
    )
}