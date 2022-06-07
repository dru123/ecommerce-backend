const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
console.log("i m in routes");
//creating a signup for user
router.put("/signup", authController.postSignup);
router.post("/login", authController.postLogin);
module.exports = router;

// 9717340272-anubhav
