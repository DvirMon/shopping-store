const mongoose = require("mongoose");
const Cart = require("./cart-model");
const CartItem = require("./cartItem-model")
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
    cartRef: {
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
      validate: {
        validator: validation.validCreditCard,
        message: (props) => `${props.value} is not a valid credit card number!`,
      },
      get: obfuscate,
      // set: obfuscate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    versionKey: false,
  }
);


OrderSchema.statics.getOrdersHistory = async function (userId) {
  const orders = await Order
    .find({ userId })
    .sort({ shippingDate: 'desc' })
    .select({ _id: 1, shippingDate: 1, orderDate: 1, cartRef: 1, totalPrice: 1 })

  let history = []

  for (const order of orders) {
    const items = await CartItem.findItemsByCart(order.cartRef)
    history.push({ order, items })
  }

  return history.map(order => {

    return {
      _id: order.order._id,
      cartRef: order.order.cartRef,
      shippingDate: order.order.shippingDate,
      orderDate: order.order.orderDate,
      totalPrice: order.order.totalPrice,
      items: order.items
    }
  })
}



const Order = mongoose.model("Order", OrderSchema, "orders");
module.exports = Order


