const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const storeController = require("../controller/store");
router.get("/storeData", isAuth, storeController.getStore);
router.get("/devices", isAuth, storeController.getDevice);
router.get("/cart-item", isAuth, storeController.getCartProduct);
router.post("/cart", isAuth, storeController.postCart);

router.delete(
  "/cart-delete-item",
  isAuth,
  storeController.postCartDeleteProduct
);
module.exports = router;
