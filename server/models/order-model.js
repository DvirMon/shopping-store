const mongoose = require("mongoose");
const Cart = require("./cart-model");
const User = require("./user-model");
const validation = require("../services/validation.service");

const OrderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: User, required: true },
    cartId: { type: mongoose.Types.ObjectId, ref: Cart, required: true },
    totalPrice: {
      type: Number,
      required: true,
      validate: [
        validation.pattern.positive,
        "price can`t be negative or equal to 0",
      ],
    },
    city: { type: String, required: true, minlength: [3], maxlength: [30] },
    street: { type: String, required: true, minlength: [5], maxlength: [30] },
    shipmentDate: { type: Date, required: true },
    orderDate: { type: Date, required: true, default: Date.now },
    creditCard: {
      type: String,
      required: true,
      validate: [validation.pattern.creditCard, "invalid credit card number"],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", OrderSchema, "orders");
