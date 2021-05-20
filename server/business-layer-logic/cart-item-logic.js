const CartItem = require("../models/cartItem-model");

const getAllCartItemsByCartAsync = async (cartId) => {
  return await CartItem.find({ cartId }).exec();
};


const getCurrentCartAsync = async (cartId) => {
  const cartItems = await CartItem.findItemsByCart(cartId)
  return cartItems
};

const addCartItemAsync = async (cartItem) => {
  const item = await cartItem.save();
  return await CartItem.findItem(item._id)

};

const updateCartItemAsync = async (cartItem) => {
  const info = await CartItem.updateOne({ _id: cartItem._id }, cartItem).exec();
  return info.n ?  await CartItem.findItem(cartItem._id) : null;
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
