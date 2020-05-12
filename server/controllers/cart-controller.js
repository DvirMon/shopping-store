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

// check for active cart and latest purchase
// router.get("/:userId", async (request, response, next) => {
//   try {
//     // get latest cart
//     const cart = await cartLogic.getLatestCartAsync(request.params.userId);

//     // check if cart is active
//     if (cart.isActive) {
//       const cartCurrentTotalPrice = await cartItemLogic.getCurrentTotalPriceAsync(
//         cart._id
//       );
//       return response.json({
//         action: "total_price",
//         payload: cartCurrentTotalPrice[0],
//       });
//     }
//     // if false get latest order
//     const order = await orderLogic.getLatestOrderAsync(cart._id);

//     // if client dose`nt have any orders
//     if (!order) {
//       response.json({ action: "new_client", payload: "Welcome! start your first purchase" });
//     }
//     response.json({ action: "latest_order", payload: order });
//   } catch (err) {
//     next(err);
//   }
// });

// get latest cart of user
router.get("/:userId", async (request, response, next) => {
  try {
    const cart = await cartLogic.getLatestCartAsync(request.params.userId);
    if (!cart) {
      response.json(null);
    }
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
