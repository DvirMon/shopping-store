const express = require("express");
const router = express.Router();

const Order = require("../models/order-model");
const orderLogic = require("../business-layer-logic/order-logic");

const middleware = require("../services/middleware");

const key = process.env.JWT_ACCESS;


// GET request - search for product
router.get(
  "/search/:userId/:query",
  async (request, response, next) => {
    try {

      const { userId, query } = request.params

      const orders = await orderLogic.searchOrders(userId, query)

      response.json(orders);
    } catch (err) {
      next(err);
    }
  }
);

// GET REQUEST - http://localhost:3000/api/orders/history/:userId
router.get(
  "/history/:userId",
  // middleware.authorize(false, key),
  async (request, response, next) => {
    try {

      const orders = await Order.getOrdersHistory(request.params.userId)
      response.json(orders)

    } catch (err) {
      next(err);
    }
  }
);
// get order dates
router.get(
  "/dates",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const totalDocs = await orderLogic.countOrdersByDate();
      response.json(totalDocs);
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
