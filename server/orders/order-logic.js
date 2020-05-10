const Order = require("./order-model");

const getAllOrdersAsync = async () => {
  return await Order.find({}).exec();
};

const addOrderAsync = async (order) => {
  return order.save();
};



module.exports = {
  getAllOrdersAsync,
  addOrderAsync
}
