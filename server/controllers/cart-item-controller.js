const express = require("express");
const router = express.Router();

const CartItem = require("../models/cartItem-model");
const cartItemLogic = require("../business-layer-logic/cartsItem-logic");

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

// get current cart date and total price
router.get("/:cartId", async (request, response, next) => {
  try {
    // validate if cart exist? for postmen?
    const cartCurrentTotalPrice = await cartItemLogic.getCurrentTotalPriceAsync(
      cart._id
    );
    response.json({
      action: "total_price",
      payload: cartCurrentTotalPrice[0],
    });
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
