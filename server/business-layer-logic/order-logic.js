const Order = require("../models/order-model");

const getAllOrdersAsync = async () => {
  return await Order.find({}).exec();
};

const getTotalDocsAsync = async () => {
  return Order.estimatedDocumentCount();
};

const addOrderAsync = async (order) => {
  return order.save();
};

const getLatestOrderAsync = async (cartId) => {
  return await Order.findOne({ cartId }).select("totalPrice orderDate").exec();
};

const countOrdersByDate = async (query) => {
  return Order.aggregate([
    {
      $group: {
        _id: "$shipmentDate",
        orders: { $sum: 1 },
      },
    },
  ]);
};

module.exports = {
  getAllOrdersAsync,
  getTotalDocsAsync,
  addOrderAsync,
  getLatestOrderAsync,
  countOrdersByDate,
};
