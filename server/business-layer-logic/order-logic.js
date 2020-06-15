const Order = require("../models/order-model");

const getAllOrdersAsync = async () => {
  return await Order.find({}).exec();
};

const getOrderAsync = async (_id) => {
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
        _id: { $gte: dayOfYear() },
        orders: { $gte: 3 },
      },
    },
  ]);

  const dates = temp.map((obj) => {
    return obj._id;
  });

  return dates;
};

// function to get day of year as a number
const dayOfYear = () => {
  const date = new Date();
  const x = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const y = Date.UTC(date.getFullYear(), 0, 0);

  const day = (x - y) / 24 / 60 / 60 / 1000;
  return isLeapYear(date) ? day + 1 : day;
};

// function to valid leap year
const isLeapYear = (date) => {
  const year = date.getFullYear();
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}; 

module.exports = {
  getAllOrdersAsync,
  getOrderAsync,
  getTotalDocsAsync,
  addOrderAsync,
  getLatestOrderAsync,
  countOrdersByDate,
};
