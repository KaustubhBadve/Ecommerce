const router=require("express").Router()

const products=require("../controller/products")
const validateToken = require("../middlewares/authorization");


router.get("/categorylist",products.fetchcategories)

router.post("/addProduct",products.addProduct)

router.get("/getProduct",products.fetchProductList)

router.get("/getProduct/:id",products.fetchProductData)

router.get("/getallproducts",products.fetchAllProductGroupwise)

router.post("/addtowishlist/:productId",validateToken(),products.addToWishList)

router.get("/wishlisteditems",validateToken(),products.fetchWishListItems)

router.post("/addtocart/:productId",validateToken(),products.addToCartList)

router.get("/cartitems",validateToken(),products.fetchCartItems)

router.post("/removefromcart/:productId",validateToken(),products.removeFromCartList)

module.exports = router;