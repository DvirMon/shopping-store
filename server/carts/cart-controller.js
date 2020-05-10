const express = require("express");
const router = express.Router();

const Cart = require("./cart-model");
const cartLogic = require("./cart-logic");
const validation = require("../services/validation.service");

router.get("/", async (request, response, next) => {
  try {
    const carts = await cartLogic.getAllCartsAsync();
    response.json(carts);
  } catch (err) {
    next(err);
  }
});

router.post("/", validation.cartValidation, async (request, response, next) => {
  try {
    request.body.createDate = new Date();
    const cart = await cartLogic.addCartAsync(new Cart(request.body));
    response.status(201).json(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
