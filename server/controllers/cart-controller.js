const express = require("express");
const router = express.Router();

const Cart = require("../models/cart-model");
const cartLogic = require("../business-layer-logic/cart-logic");
const cartItemLogic = require("../business-layer-logic/cart-item-logic");
const authLogic = require("../business-layer-logic/auth-logic");

const middleware = require("../middleware/middleware");
const key = config.secret.access;

// router.get("/", async (request, response, next) => {
//   try {
//     const carts = await cartLogic.getAllCartsAsync();
//     response.json(carts);
//   } catch (err) {
//     next(err);
//   }
// });

// get latest cart of user
router.get(
  "/latest/:userId",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const cart = await cartLogic.getLatestCartAsync(request.params.userId);
      response.json(cart);
    } catch (err) {
      next(err);
    }
  }
);

// get new cart
router.post(
  "/",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      // valid if user exist (for postmen)
      const user = await authLogic.isUserExist(request.body.userId);

      if (!user) {
        return next({ status: 404, message: "user is not exist" });
      }

      const cart = await cartLogic.addCartAsync(new Cart(request.body));
      response.status(201).json(cart);
    } catch (err) {
      next(err);
    }
  }
);

// update cart status
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

// delete cart and cart items
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
