const express = require("express");
const router = express.Router();

const Cart = require("../models/cart-model");

const cartLogic = require("../business-layer-logic/cart-logic");
const cartItemLogic = require("../business-layer-logic/cart-item-logic");
const authLogic = require("../business-layer-logic/auth-logic");

const middleware = require("../services/middleware");

const key = process.env.JWT_ACCESS;



// GET request - get user cart - http://localhost:3000/api/carts/user/:userId"
router.get(
  "/user/:userId",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const cart = await Cart.findCart(request.params.userId);
      response.json(cart);
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
);

// POST request - create new cart : http://localhost:3000/api/carts"
router.post(
  "/",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {

      const cart = await Cart.create(request.body)

      response.status(201).json(cart); 
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
);


// PUT request - update cart  : http://localhost:3000/api/carts"
router.put("/",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {

      const cart = request.body
      const updatedCart = await Cart.updateCart(cart);
      response.json(updatedCart);
    } catch (err) {

      console.log(err)
      next(err);
    }
  }
);

// PATCH request - update cart status : http://localhost:3000/api/carts/:cartId"
router.patch(
  "/:_id",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const cart = {
        _id: request.params._id,
        isActive: request.body.isActive,
      };

      const updatedCart = await cartLogic.disActivatedCartAsync(cart);
      response.json(updatedCart);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE request - delete cart and cart item : http://localhost:3000/api/carts/:_id"
router.delete(
  "/:_id",
  middleware.authorize(false, key),
  async (request, response) => {
    await cartLogic.deleteCartAsync(request.params._id);
    await cartItemLogic.deleteAllCartItemsAsync(request.params._id);
    response.sendStatus(204);
  }
);

module.exports = router;
