const express = require("express");
const router = express.Router();

const Product = require("../../models/product-model");
const productLogic = require("../../business-layer-logic/product-logic");
const authorize = require("../../middleware/handleAuth");
const key = config.secret.access;

router.use(authorize(true, key));

// add product only admin
router.post("/", async (request, response, next) => {
  try {
    const product = await productLogic.addProductAsync(
      new Product(request.body)
    );
    response.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// update product only admin
router.put("/:_id", async (request, response, next) => {
  try {
    const product = request.body;
    product._id = request.params._id;

    const updatedProduct = await productLogic.updateProductAsync(
      new Product(product)
    );
    response.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
