const mongoose = require("mongoose");

const Product = require("./product-model");
const Cart = require("./cart-model");

const CartItemSchema = mongoose.Schema(
  {
    productRef: {
      type: mongoose.Types.ObjectId,
      ref: Product,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      validate: [/^[1-9]+[0-9]*$/, "quantity can`t be negative or equal to 0"],
    },
    cartId: { type: mongoose.Types.ObjectId, ref: Cart, required: true },
  },
  { versionKey: false },

);

CartItemSchema.statics.findItem = async function (_id) {
  return await CartItem.findById({ _id }).populate("productRef").exec()
}

CartItemSchema.statics.findItemsByCart = async function (cartId) {
  return await CartItem.find({ cartId }).populate("productRef").exec()
}

const CartItem = mongoose.model("CartItem", CartItemSchema, "cartItems");
module.exports = CartItem


// totalPrice: {
//   type: Number,
//   required: true,
//   validate: [/^[1-9]+[0-9]*$/, "price can`t be negative or equal to 0"]
// },