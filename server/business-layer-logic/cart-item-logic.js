const CartItem = require("../models/cartItem-model");
const mongoose = require("mongoose");

const getAllCartItemsByCartAsync = async (cartId) => {
  return await CartItem.find({ cartId }).exec();
};

const getCurrentCartAsync = async (cartId) => {
  // add match?

  cartId = mongoose.Types.ObjectId(cartId);

  const cartTotalPrice = await CartItem.aggregate([
    {
      $match: { cartId },
    },
    {
      $group: {
        _id: "$cartId",
        totalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);

  const cartItems = await CartItem.find({ cartId }).exec();
  return cartTotalPrice.length === 0
    ? null
    : { price: cartTotalPrice[0].totalPrice, cartItems };
};

const addCartItemAsync = async (cartItem) => {
  return cartItem.save();
};

const updateCartItemAsync = async (cartItem) => {
  const info = await CartItem.updateOne({ _id: cartItem._id }, cartItem).exec();
  return info.n ? cartItem : null;
};

const deleteCartItemAsync = async (_id) => {
  return CartItem.deleteOne({ _id }).exec();
};

module.exports = {
  getAllCartItemsByCartAsync,
  getCurrentCartAsync,
  addCartItemAsync,
  updateCartItemAsync,
  deleteCartItemAsync,
};
