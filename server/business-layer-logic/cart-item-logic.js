const mongoose = require("mongoose");
const CartItem = require("../models/cartItem-model");

const getAllCartItemsByCartAsync = async (cartId) => {
  return await CartItem.find({ cartId }).exec();
};

const getCartTotalPrice = async (cartId) => {

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

  return cartTotalPrice[0].totalPrice;
};

const getCurrentCartAsync = async (cartId) => {
  const cartItems = await CartItem.find({ cartId }).exec();
  return cartItems
};

const addCartItemAsync = async (cartItem) => {
  console.log(cartItem)
  return cartItem.save();

};

const updateCartItemAsync = async (cartItem) => {
  const info = await CartItem.updateOne({ _id: cartItem._id }, cartItem).exec();
  return info.n ? cartItem : null;
};

const deleteCartItemAsync = async (_id) => {
  await CartItem.deleteOne({ _id }).exec();
};

const deleteAllCartItemsAsync = async (cartId) => {
  await CartItem.deleteMany({ cartId }).exec();
};

module.exports = {
  getAllCartItemsByCartAsync,
  getCurrentCartAsync,
  addCartItemAsync,
  updateCartItemAsync,
  deleteCartItemAsync,
  deleteAllCartItemsAsync,
};
