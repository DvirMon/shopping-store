const mongoose = require("mongoose");
const Cart = require("./cart-model");
const User = require("./user-model");
const validation = require("../services/schema");

// format credit card number
const obfuscate = (cc) => {
  return "****-****-****-" + cc.slice(cc.length - 4, cc.length);
};

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true
    },
    cartId: {
      type: mongoose.Types.ObjectId,
      ref: Cart,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
      minlength: [3],
      maxlength: [30]
    },
    street: { type: String, required: true, minlength: [5], maxlength: [30] },
    shippingDate: { type: Date, required: true },
    orderDate: { type: Date, required: true, default: Date.now },
    creditCard: {
      type: String,
      required: true,
      get: obfuscate,
      validate: {
        validator: validation.validCreditCard,
        message: (props) => `${props.value} is not a valid credit card number!`,
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    versionKey: false,
  }
);

const Order = mongoose.model("Order", OrderSchema, "orders");
module.exports = Order


