const express = require("express");
const router = express.Router();

const Cart = require("../models/cart-model");
const cartLogic = require("../business-layer-logic/cart-logic");
const orderLogic = require("../business-layer-logic/order-logic");
const cartItemLogic = require("../business-layer-logic/cartsItem-logic");

router.get("/", async (request, response, next) => {
  try {
    const carts = await cartLogic.getAllCartsAsync();
    response.json(carts);
  } catch (err) {
    next(err);
  }
});


// get latest cart of user
router.get("/latest/:userId", async (request, response, next) => {
  try {
    const cart = await cartLogic.getLatestCartAsync(request.params.userId);
    response.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const cart = await cartLogic.addCartAsync(new Cart(request.body));
    response.status(201).json(cart);
  } catch (err) {
    next(err);
  }
});

router.patch("/:_id", async (request, response, next) => {
  try {
    const cart = {
      _id: request.params._id,
      isActive: false,
    };
    const updatedCart = await cartLogic.updatedCartStatusAsync(cart);
    response.json(updatedCart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
