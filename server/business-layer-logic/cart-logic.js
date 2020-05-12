const Cart = require("../models/cart-model");

const getAllCartsAsync = async () => {
  return await Cart.find({}).exec();
};

const addCartAsync = async (cart) => {
  return cart.save();
};

const getLatestCartAsync = async (userId) => {
  return await Cart.findOne({ userId })
    .sort([["createDate", -1]])
    .select("isActive")
    .exec();
};

const updatedCartStatusAsync = async (cart) => {
  const info = await Cart.updateOne({ _id: cart._id }, cart).exec();
  return info.n ? cart : null
};

module.exports = {
  getAllCartsAsync,
  addCartAsync,
  getLatestCartAsync,
  updatedCartStatusAsync
};
