const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const storeController = require("../controller/store");
//user to get the store
router.get("/storeData", isAuth, storeController.getStore);

//user to getting the devices
router.get("/devices", isAuth, storeController.getDevice);

// get the cart of user
router.get("/cart-item", isAuth, storeController.getCartProduct);

//route for adding device to the cart
router.post("/cart", isAuth, storeController.postCart);

//route for deleting the item from cart
router.delete(
  "/cart-delete-item",
  isAuth,
  storeController.postCartDeleteProduct
);

//route for getting orders
router.get("/orders", isAuth, storeController.getOrders);

//router for finall order for the user
router.put("/post-order", isAuth, storeController.postOrder);

module.exports = router;
