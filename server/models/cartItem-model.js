const mongoose = require("mongoose");
const Product = require("./product-model");
const Cart = require("./cart-model");

const CartItemSchema = mongoose.Schema(
  {
    productId: { type: mongoose.Types.ObjectId, ref: Product, required: true },
    quantity: {
      type: Number,
      // required: true,
      validate: [/^[1-9]+[0-9]*$/, "quantity can`t be negative or equal to 0"],
    },
    totalPrice: {
      type: Number,
      // required: true,
      validate: [/^[1-9]+[0-9]*$/, "price can`t be negative or equal to 0"],
    },

    cartId: { type: mongoose.Types.ObjectId, ref: Cart, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("CartItem", CartItemSchema, "cartItems");
