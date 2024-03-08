const router=require("express").Router()
const user=require("../controller/users")
const errors = require("../middlewares/validator/users");

// for user registration
router.post("/auth/register", errors.USER_REGISTRATION, user.userRegistration);

// for user login
router.post("/auth/login", errors.USER_LOGIN, user.userLogin);

module.exports = router;