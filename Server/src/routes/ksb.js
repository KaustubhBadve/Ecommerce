const router=require("express").Router()

const ksb=require("../controller/ksb")
router.get("/categorylist",ksb.fetchcategories)

router.post("/addProduct",ksb.addProduct)

router.get("/getProduct",ksb.fetchProductList)

router.get("/getProduct/:id",ksb.fetchProductData)

router.get("/getallproducts",ksb.fetchAllProductGroupwise)

module.exports = router;