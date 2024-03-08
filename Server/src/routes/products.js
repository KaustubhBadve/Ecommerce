const router=require("express").Router()

const products=require("../controller/products")

router.get("/categorylist",products.fetchcategories)

router.post("/addProduct",products.addProduct)

router.get("/getProduct",products.fetchProductList)

router.get("/getProduct/:id",products.fetchProductData)

router.get("/getallproducts",products.fetchAllProductGroupwise)

module.exports = router;