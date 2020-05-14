const CartItem = require("../models/cartItem-model");

const getAllCartItemsByCartAsync = async (cartId) => {
  return await CartItem.find({ cartId }).exec();
};

const getCurrentTotalPriceAsync = async (cartId) => {
  // add match?
  return await CartItem.aggregate([
    // { $match: { cartId: "5eb921aba66e913e9005dba3" } },
    {
      $group: {
        _id: "$cartId",
        currentTotalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);
};

const addCartItemAsync = async (cartItem) => {
  return cartItem.save();
};

const deleteCartItemAsync = async (_id) => {
  return CartItem.deleteOne({ _id }).exec();
};

module.exports = {
  getAllCartItemsByCartAsync,
  getCurrentTotalPriceAsync,
  addCartItemAsync,
  deleteCartItemAsync,
};