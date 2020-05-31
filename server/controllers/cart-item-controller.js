const express = require("express");
const router = express.Router();

const CartItem = require("../models/cartItem-model");
const cartItemLogic = require("../business-layer-logic/cart-item-logic");

const authorize = require("../middleware/handleAuth");
const key = config.secret.access;

router.post("/", authorize(0, key), async (request, response, next) => {
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

// update cart item
router.put("/:_id", authorize(0, key), async (request, response, next) => {
  try {
    const cartItem = request.body;
    cartItem._id = request.params._id;
    const updatedCartItem = await cartItemLogic.updateCartItemAsync(cartItem);
    if (updatedCartItem === null) {
      return next({ status: 404, message: "item do not exist" });
    }

    response.json(updatedCartItem);
  } catch (err) {
    next(err);
  }
});


// delete cart item
router.delete("/:_id", authorize(0, key), async (request, response) => {
  await cartItemLogic.deleteCartItemAsync(request.params._id)
  response.sendStatus(204);
});


module.exports = router;
