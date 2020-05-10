const Cart = require("./cart-model");

const getAllCartsAsync = async () => {
  return await Cart.find({}).exec();
};

const addCartAsync = async (cart) => {
  return cart.save();
};




module.exports = {
  getAllCartsAsync,
  addCartAsync
}
