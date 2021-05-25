const mongoose = require("mongoose");
const Order = require("../models/order-model");
const CartItem = require("../models/cartItem-model");
const User = require("../models/user-model")

const dateService = require('../services/date');

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
        _id: { $gte: dateService.dayOfYear(new Date()) },
        orders: { $gte: 3 },
      },
    },
  ]);

  const dates = temp.map((obj) => {
    return obj._id;
  });

  return dates;
};


const getOrdersHistory = async (userId, days) => {

  const orders = days > 90
    ? await getOrdersByYear(userId, days)
    : await getOrdersByDay(userId, days)

  let history = []

  for (const order of orders) {
    const items = await CartItem.findItemsByCart(order.cartRef)
    history.push({ order, items })
  }

  return history.map(order => {

    return {
      _id: order.order._id,
      cartRef: order.order.cartRef,
      shippingDate: order.order.shippingDate,
      orderDate: order.order.orderDate,
      totalPrice: order.order.totalPrice,
      user: { fullName: order.order.userId.fullName },
      items: order.items
    }
  })
}


const getOrdersYears = async (userId) => {


  const temp = await Order.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: { $year: "$orderDate" }
      },
    },
    {
      $sort: { _id: -1 },
    },
  ]);

  const years = temp.map((obj) => {
    return obj._id
  });

  return years;
};

const getOrdersByDay = async (userId, days) => {

  const date = dateService.getLastDaysDate(days)

  return await Order
    .find({ userId: new mongoose.Types.ObjectId(userId) })
    .populate("userId")
    .where('orderDate').gt(date)
    .sort({ shippingDate: 'desc' })
};

const getOrdersByYear = async (userId, year) => {

  const orders = await Order.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        shippingDate: 1,
        orderDate: 1,
        cartRef: 1,
        totalPrice: 1,
        userId: 1,
        year: { $year: "$orderDate" }
      }
    },
    { $sort: { orderDate: -1 } },
    { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userId' } },
    { $match: { year: parseInt(year) } }
  ]);

  return orders.map((order) => {
    order.userId = User.build(order.userId[0])
    return order
  })


};


const searchProductInOrders = async (userId, query) => {

  const orders = await Order
    .find({ userId })
    .select({ shippingDate: 1, cartRef: 1 })


  let items = []

  for (const order of orders) {

    const temp = await CartItem
      .find({ cartId: order.cartRef })
      .select({ productRef: 1 })
      .populate("productRef")
      .exec()

    items.push({ _id: order._id, shippingDate: order.shippingDate, items: temp })
  }

  const results = items.filter(order => {

    order.items = order.items.filter(item => {
      return item.productRef.name.toLowerCase().includes(query.toLowerCase())
    })

    if (order.items.length > 0) {
      return order
    }
  })

  return results



}



module.exports = {
  getAllOrdersAsync,
  getOrderAsync,
  getTotalDocsAsync,
  addOrderAsync,
  getLatestOrderAsync,

  countOrdersByDate,
  searchProductInOrders,

  getOrdersHistory,
  getOrdersYears,

  getOrdersByYear
};
