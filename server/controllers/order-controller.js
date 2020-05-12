const express = require("express");

const router = express.Router();

const Order = require("../models/order-model");
const orderLogic = require("../business-layer-logic/order-logic");
const validation = require("../services/validation.service");

router.get("/", async (request, response, next) => {
  try {
    const orders = await orderLogic.getAllOrdersAsync();
    response.json(orders);
  } catch (err) {
    next(err);
  }
});

// get latest order purchase
router.get("/:cardId", async (request, response, next) => {
  try {
    const order = await orderLogic.getLatestOrderAsync(cart._id);
    response.json(order);
  } catch (err) {
    next(err);
  } 
});

router.get("/total-docs", async (request, response, next) => {
  try {
    const totalDocs = await orderLogic.getTotalDocsAsync();
    response.json(totalDocs);
  } catch (err) {
    next(err);
  }
});

router.get("/dates", async (request, response, next) => {
  try {
    const totalDocs = await orderLogic.countOrdersByDate();
    response.json(totalDocs);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  validation.dateFormatValidation,
  async (request, response, next) => {
    try {
      const order = await orderLogic.addOrderAsync(new Order(request.body));
      response.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
