import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoris } from "../../Redux/action";

export const NavbarCategories = () => {
  const dispatch = useDispatch();
  const {categories}= useSelector((state)=>state?.mainReducer)
    useEffect(() => {
        dispatch(getCategoris())
    }, []);
    return (
        <div className="navabr-categories"> 
         {categories?.map((item)=>{
            return (
                <div>{item?.categoryName}</div>
            )
         })}
        </div>
    )
}