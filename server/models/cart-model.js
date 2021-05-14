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

CartSchema.statics.createCart = async function () {
  const cart = Cart.build();
  return await cart.save();
}

CartSchema.statics.setCart = async function () {

  return cart === null
    ? Cart.create({ items: [] })
    : Cart.build(cart)
}

CartSchema.statics.findCart = async function (payload) {

  const cart = await Cart.findOne({ userId: payload.userId })
    .sort([["createDate", -1]])
    .exec();

  if (cart && cart.isActive) {
    return Cart.build(cart)
  }

  return await Cart.create(payload)


}

CartSchema.methods.get_id = function () {
  return this._id
}



const Cart = mongoose.model("Cart", CartSchema, "carts");
module.exports = Cart
