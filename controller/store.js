const Device = require("../models/devices");
const Order = require("../models/order");
const Store = require("../models/store");
const User = require("../models/user");
const stripe = require("stripe")(process.env.STRIPE_KEY);

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
  //finding device from database.
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
  const cart = await req.user.addToCart(device);

  res
    .status(200)
    .json({ message: "successfully added to cart", userData: cart });
};

exports.postCartDeleteProduct = async (req, res, next) => {
  //deleting product form cart
  const prodId = req.body.deviceId;
  const deltedData = await req.user.removeFromCart(prodId);
  //sending response to user
  res.status(200).json({
    message: "sucessfuly deleted",
    userData: deltedData,
  });
};

//getting the cart
exports.getCartProduct = async (req, res, next) => {
  //populate is used  here to get the device of user
  try {
    const user = await req.user.populate("cart.items.productId");
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const cartItems = user.cart.items;

    res.render("../views/cart", {
      path: "/cart",
      pageTitle: "Cart",
      products: cartItems,
    });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

//post order
exports.postOrder = async (req, res, next) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items.map((i) => {
      return { quantity: i.quantity, product: { ...i.productId._doc } };
    });
    //creating order for the user...
    const order = new Order({
      user: {
        email: req.user.email,
        userId: req.user._id,
      },

      products: products,
    });
    order.save();
    //clearing cart  because order is placed ,so the cart should be empty
    req.user.clearCart();
    //sending the response
    res.status(200).json({
      message: "Successfully order placed",
      order: order,
    });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    //find the orders with the help of userId store in request
    const orders = await Order.find({ "user.userId": req.user._id });
    return res.status(200).json({
      message: "Succesfuuly get order",
      order: orders,
    });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};
