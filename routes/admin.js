const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.js");
const isAdmin = require("../middleware/is-admin");
const isAuth = require("../middleware/is-auth.js");

const {
  storeValidation,
  deviceValidation,
} = require("../middleware/is-error.js");

//router for adding the store to the database
router.put(
  "/addstore",
  isAuth,
  isAdmin,
  storeValidation,
  adminController.addStore
);

//for getting the device
router.put(
  "/addDevice/:storeId",
  isAuth,
  isAdmin,
  deviceValidation,
  adminController.addDevice
);
module.exports = router;
