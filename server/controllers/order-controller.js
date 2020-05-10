const express = require("express");

const router = express.Router();

const orderLogic = require("../business-logic-layer/order-logic");

router.get("/", async (request, response, next) => {
  try {
    const orders = await orderLogic.getAllOrdersAsync();
    response.json(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
