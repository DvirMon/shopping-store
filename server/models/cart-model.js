const mongoose = require("mongoose");
const User = require("./user-model");

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User
    },
    createDate: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    },
  },
  { versionKey: false }
);

// MODEL METHODS 



CartSchema.statics.build = function (cart) {
  return new Cart(cart)
}

CartSchema.statics.setCart = async function () {

  return cart === null
    ? Cart.create({ items: [] })
    : Cart.build(cart)
}

CartSchema.statics.findCart = async function (userId) {

  const cart = await Cart.findOne({ userId })
    .sort([["createDate", -1]])
    .exec();

  if (cart && cart.isActive) {
    return Cart.build(cart)
  }

  return null
}

CartSchema.statics.updateCart = async function (payload) {
  const cart = Cart.findCart(payload)
  cart = { ...payload }
  return await cart.save()
}
 
CartSchema.methods.get_id = function () { 
  return this._id
}



const Cart = mongoose.model("Cart", CartSchema, "carts");
module.exports = Cart
