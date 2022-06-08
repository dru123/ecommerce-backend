const Device = require("../models/devices");
const Store = require("../models/store");
const User = require("../models/user");
exports.getStore = async (req, res, next) => {
  //get the store from database
  const store = await Store.find();
  if (!store) {
    return res.status(404).json({ message: "no store found" });
  }

  //sending the response to the database
  res.status(200).json({
    message: "successfuly get stores",
    storeData: store,
  });
};
exports.getDevice = async (req, res, next) => {
  const devices = await Device.find();
  if (!devices) {
    return res.status(404).json({ message: "no devices found" });
  }
  res.status(200).json({
    message: "successfuly get devices",
    devicesData: devices,
  });
};
exports.postCart = async (req, res, next) => {
  //creating cart for product
  const prodId = req.body.deviceId;
  const device = await Device.findById(prodId);
  console.log(device, "device");
  const cart = await req.user.addToCart(device);

  res
    .status(200)
    .json({ message: "successfully added to cart", userData: cart });
};

exports.postCartDeleteProduct = async (req, res, next) => {
  //deleting product form cart
  const prodId = req.body.deviceId;
  const deltedData = await req.user.removeFromCart(prodId);
  res.status(200).json({
    message: "sucessfuly deleted",
    userData: deltedData,
  });
};

//getting the cart
exports.getCartProduct = async (req, res, next) => {
  const user = await req.user.populate("cart.items");
  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }
  const cartItems = user.cart.items;
  res.status(200).json({
    message: "Successfully get cart",
    cart: cartItems,
  });
};
