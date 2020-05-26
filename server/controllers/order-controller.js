const express = require("express");

const router = express.Router();

const Order = require("../models/order-model");
const orderLogic = require("../business-layer-logic/order-logic");
const cartLogic = require("../business-layer-logic/cart-logic");
const validation = require("../services/validation.service");

router.get("/", async (request, response, next) => {
  try {
    const orders = await orderLogic.getAllOrdersAsync();
    response.json(orders);
  } catch (err) {
    next(err);
  }
});

// get total orders in store
router.get("/total", async (request, response, next) => {
  try {
    const totalDocs = await orderLogic.getTotalDocsAsync();
    response.json(totalDocs);
  } catch (err) {
    next(err);
  }
});

// get order dates
router.get("/dates", async (request, response, next) => {
  try {
    const totalDocs = await orderLogic.countOrdersByDate();
    response.json(totalDocs);
  } catch (err) {
    next(err);
  }
});

// get latest order purchase
router.get("/latest/:cartId", async (request, response, next) => {
  try {
    const order = await orderLogic.getLatestOrderAsync(request.params.cartId);
    response.json(order);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  validation.dateFormatValidation,
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
