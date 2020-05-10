const mongoose = require("mongoose");
const Cart = require("../carts/cart-model");
const Client = require("../auth/client-model");
const Product = require("../products/product.-model");

const OrderSchema = mongoose.Schema(
  {
    client: { type: mongoose.Types.ObjectId, ref: Client },
    product: { type: mongoose.Types.ObjectId, ref: Product },
    cart: { type: mongoose.Types.ObjectId, ref: Client },
    totalPrice: { type: Number },
    city: { type: String },
    street: { type: String },
    shipmentDate: { type: Date },
    orderDate: { type: Date },
    creditCard: { type: Number },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", OrderSchema, "orders");
