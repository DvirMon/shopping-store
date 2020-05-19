const CartItem = require("../models/cartItem-model");
const mongoose = require("mongoose");

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
  const cartTotalPrice = await getCartTotalPrice(cartId);
  return cartItems.length === 0 ? null : { price: cartTotalPrice, cartItems };
};

const addCartItemAsync = async (cartItem) => {
  const addedCartItem = await cartItem.save();
  const cartTotalPrice = await getCartTotalPrice(addedCartItem.cartId);
  return { cartItem, cartTotalPrice };
};

const updateCartItemAsync = async (cartItem) => {
  const info = await CartItem.updateOne({ _id: cartItem._id }, cartItem).exec();
  const cartTotalPrice = await getCartTotalPrice(cartItem.cartId);
  return info.n ? { cartItem, cartTotalPrice } : null;
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
