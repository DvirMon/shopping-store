const mongoose = require("mongoose");
const Product = require('./product')

const CartItemSchema = mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: Product, required: true },
    quantity: { type: Number,  required: true, },
    totalPrice: { type: Number,  required: true },
    city: { type: String },
    street: { type: String },  },
  { versionKey: false }
);

module.exports = mongoose.model('CartItem', CartItemSchema, 'cartItems')
