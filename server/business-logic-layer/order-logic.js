const Order = require("../models/order");

const getAllOrdersAsync = async () => {
  return await Order.find({}).exec();
};



module.exports = {
  getAllOrdersAsync,
}
