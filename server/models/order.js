const mongoose = require("mongoose");
const Cart = require("./cart");
const Client = require("./client");
const Product = require("./product");

const OrderSchema = mongoose.Schema(
  {
    client: { type: mongoose.Types.ObjectId, ref: Client, required: true },
    product: { type: mongoose.Types.ObjectId, ref: Product, required: true },
    cart: { type: mongoose.Types.ObjectId, ref: Client, required: true },
    totalPrice: { type: Number, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    shipmentDate: { type: Date, required: true },
    orderDate: { type: Date, required: true },
    creditCard: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", OrderSchema, "orders");;
