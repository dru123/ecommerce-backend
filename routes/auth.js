const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { signupLoginValidation } = require("../middleware/is-error");
console.log("i m in routes");
//creating a signup for user
router.put("/signup", signupLoginValidation, authController.postSignup);
router.post("/login", signupLoginValidation, authController.postLogin);
module.exports = router;

// 9717340272-anubhav
