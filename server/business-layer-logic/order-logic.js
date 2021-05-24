const mongoose = require("mongoose");
const Order = require("../models/order-model");
const CartItem = require("../models/cartItem-model");

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


const getOrdersHistory = async (userId, day) => {

  const orders = await Order
    .find({ userId })
    .sort({ shippingDate: 'desc' })
    .select({ _id: 1, shippingDate: 1, orderDate: 1, cartRef: 1, totalPrice: 1 })

  // const orders = await getOrdersByDay(userId, day)

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
      $sort: { year: 1 },
    },
  ]);

  const years = temp.map((obj) => {
    return obj._id
  });

  return years;
};

const getOrdersByDay = async ({ userId, day }) => {

  const date = dateService.getLastDaysDate(day)

  return await Order
    .find({ userId })
    .where('orderDate').gt(date)
    .sort({ shippingDate: 'desc' })
    .select({ _id: 1, shippingDate: 1, orderDate: 1, cartRef: 1 })
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
  getOrdersByDay
};
