const express = require("express");
const router = express.Router();

const Order = require("../models/order-model");

const orderLogic = require("../business-layer-logic/order-logic");

const middleware = require("../services/middleware");

const checkoutService = require("../services/checkout")

const key = process.env.JWT_ACCESS;


// GET request - search for product
router.get(
  "/search/:userId/:query",
  async (request, response, next) => {
    try {

      const { userId, query } = request.params

      const orders = await orderLogic.searchProductInOrders(userId, query)

      response.json(orders);
    } catch (err) {
      next(err);
    }
  }
);

// GET REQUEST - http://localhost:3000/api/orders/history/:userId/:date
router.get(
  "/history/:userId/:date",
  // middleware.authorize(false, key),
  async (request, response, next) => {
    try {

      const { userId, date } = request.params

      const orders = await orderLogic.getOrdersHistory(userId, date)

      response.json(orders)

    } catch (err) {
      next(err);
    }
  }
);
// get order dates
router.get(
  "/dates",
  // middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const totalDocs = await orderLogic.countOrdersByDate();
      response.json(totalDocs);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/years/:userId",
  async (request, response, next) => {
    try {
      const userId = request.params.userId
      const years = await orderLogic.getOrdersYears(userId);
      response.json(years);
    } catch (err) {
      next(err);
    }
  }
);

// get latest order purchase
router.get(
  "/latest/:cartId",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const order = await orderLogic.getLatestOrderAsync(request.params.cartId);
      response.json(order);
    } catch (err) {
      next(err);
    }
  }
);

// add new order
router.post(
  "/dates",
  // middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const { userId, days } = request.body
      console.log(days)
      const dates = await orderLogic.getOrdersByDay(userId, days)
      response.json(dates);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/checkout",
  // middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const session = await checkoutService.checkout()
      response.json(session.id);
    } catch (err) {
      next(err);
    }
  }
);

// add new order
router.post(
  "/",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const order = request.body;
      const addedOrder = await orderLogic.addOrderAsync(new Order(order));
      response.status(201).json(addedOrder);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
