const express = require("express");

const router = express.Router();

const Order = require("../models/order-model");
const orderLogic = require("../business-layer-logic/order-logic");
const validation = require("../services/validation.service");

const middleware = require("../middleware/middleware");
const key = config.secret.access;

// router.get("/", async (request, response, next) => {
//   try {
//     const orders = await orderLogic.getAllOrdersAsync();
//     response.json(orders);
//   } catch (err) {
//     next(err);
//   }
// });

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

// get order
// router.get("/:_id", async (request, response, next) => {
//   try {
//     const order = await orderLogic.getOrderAsync(request.params._id);

//     response.json(order);
//   } catch (err) {
//     next(err);
//   }
// });

// add new order
router.post(
  "/",
  middleware.authorize(false, key),
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
