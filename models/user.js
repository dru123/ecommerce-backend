const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating the user schema
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Store",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

//creating method for adding the product into the cart
userSchema.methods.addToCart = (product) => {
  const productIndex = this.cart.items.findIndex((productData) => {
    //checking the whether the product is present in cart or not using id comparasion
    return productData.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  let newCartItems = [...this.cart.items];
  if (productIndex >= 0) {
    //product already exist just increased the quantity
    newQuantity = newCartItems[productIndex].quantity + 1;
    newCartItems[productIndex].quantity = newQuantity;
  } else {
    //product not exist create new one and push it into the cart
    newCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  //creating new cart with updated items
  const newCart = {
    items: newCartItems,
  };
  this.cart = newCart;
  return this.save();
};

//for removing the items in the cart

userSchema.methods.removeCart = (productId) => {
  const updatedCartItem = this.cart.items.filter(
    (productData) => productData.productId.toString() !== productId.toString()
  );
  this.cart.items = updatedCartItem;
  return this.save();
};

//for clearing the cart
userSchema.methods.clearCart = () => {
  this.cart = { items: [] };
  return this.save();
};
//exporting the model for futher process
module.exports = mongoose.model("User", userSchema);
