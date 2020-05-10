const Cart = require("../models/cart");

const getAllCartsAsync = async () => {
  return await Cart.find({}).exec();
};



module.exports = {
  getAllCartsAsync,
}
