const express = require("express");
const router = express.Router();

const cartLogic = require("../business-logic-layer/cart-logic");

router.get("/", async (request, response, next) => {
  try {
    const carts = await cartLogic.getAllCartsAsync();
    response.json(carts)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
