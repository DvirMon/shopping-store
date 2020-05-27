const Order = require("../models/order-model");

const getAllOrdersAsync = async () => {
  return await Order.find({}).exec();
};

const getOrderAsync = async ( _id ) => {
  return await Order.findById({ _id }).exec();
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

const countOrdersByDate = async () => {
  const temp = await Order.aggregate([
    {
      $group: {
        _id: { $dayOfYear: "$shippingDate" },
        orders: { $sum: 1 },
      },
    },
    {
      $match: {
        orders: { $gte: 3 },
      },
    },
  ]);

  const dates = temp.map((obj) => {
    return obj._id;
  });

  return dates;
};

module.exports = {
  getAllOrdersAsync,
  getOrderAsync,
  getTotalDocsAsync,
  addOrderAsync,
  getLatestOrderAsync,
  countOrdersByDate,
};
