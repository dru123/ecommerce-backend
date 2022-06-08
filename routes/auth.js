const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { signupLoginValidation } = require("../middleware/is-error");
//creating a signup for user
router.put("/signup", signupLoginValidation, authController.postSignup);

//creating login for user
router.post("/login", signupLoginValidation, authController.postLogin);
module.exports = router;
