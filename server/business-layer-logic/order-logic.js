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

  const dates = temp.map(obj => {
    return obj._id
  })

  return dates;
};

module.exports = {
  getAllOrdersAsync,
  getTotalDocsAsync,
  addOrderAsync,
  getLatestOrderAsync,
  countOrdersByDate,
};
