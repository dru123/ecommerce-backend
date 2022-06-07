const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const storeController = require("../controller/store");
router.get("/storeData", isAuth, storeController.getStore);
router.get("/devices", isAuth, storeController.getDevice);
module.exports = router;
