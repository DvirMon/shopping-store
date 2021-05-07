const express = require("express");
const router = express.Router();

const CartItem = require("../models/cartItem-model");
const cartItemLogic = require("../business-layer-logic/cart-item-logic");

const middleware = require("../services/middleware");
const key = process.env.JWT_ACCESS;

// POST request - add cart item : http://localhost:3000/api/cart-item"

router.post("/",
  // middleware.authorize(false, key),
  async (request, response, next) => {
    try {

      console.log(request.body)

      const cartItem = await cartItemLogic.addCartItemAsync(new CartItem(request.body));

      console.log(cartItem)

      response.status(201).json(cartItem);
    } catch (err) {
      next(err);
    }
  });


// GET request - get  cart Items data - total price and items -  http://localhost:3000/api/cart-item/:cartId"
router.get("/:cartId", async (request, response, next) => {
  try {

    const cartItems = await cartItemLogic.getCurrentCartAsync(
      request.params.cartId
    );
 
    // if (!cartItems) {
    //   return response.json({ cartItems: [], price: 0 });
    // }

    response.json(cartItems);
  } catch (err) {
    next(err);
  }
});

// PUT request - update cart item
router.put("/:_id", middleware.authorize(false, key), async (request, response, next) => {
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
router.delete("/:_id", middleware.authorize(false, key), async (request, response) => {
  await cartItemLogic.deleteCartItemAsync(request.params._id)
  response.sendStatus(204);
});


module.exports = router;
