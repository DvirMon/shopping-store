const express = require("express");
const router = express.Router();

const CartItem = require("../models/cartItem-model");
const cartItemLogic = require("../business-layer-logic/cart-item-logic");

router.post("/", async (request, response, next) => {
  try {
    // validate if cart exist? for postmen?

    const cartItem = await cartItemLogic.addCartItemAsync(
      new CartItem(request.body)
    );

    response.status(201).json(cartItem);
  } catch (err) {
    next(err);
  }
});

// get current cart date, total price and items
router.get("/:cartId", async (request, response, next) => {
  try {
    const currentCart = await cartItemLogic.getCurrentCartAsync(
      request.params.cartId
    );

    if (!currentCart) {
      return next({ status: 404, message: "cart is not exist" });
    }

    response.json(currentCart);
  } catch (err) {
    next(err);
  }
});

router.delete("/:_id", async (request, response, next) => {
  try {
    await cartItemLogic.deleteCartItemAsync(request.params_id);
    response.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
