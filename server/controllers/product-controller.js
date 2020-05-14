const express = require("express");

const router = express.Router();

const Product = require("../models/product-model");
const productLogic = require("../business-layer-logic/product-logic");

router.get("/", async (request, response, next) => {
  try {
    const products = await productLogic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    next(err);
  }
});

// get total store products
router.get("/total", async (request, response, next) => {
  try {
    const totalDocs = await productLogic.getTotalDocsAsync();
    response.json(totalDocs);
  } catch (err) {
    next(err);
  }
});

router.get("/category/:categoryId", async (request, response, next) => {
  try {
    const products = await productLogic.getAllProductsByCategoryAsync(
      request.params.categoryId
    );

    if (products.length === 0) {
      next({ status: 404, message: "no content" });
    }

    response.json(products);
  } catch (err) {
    console.log(err)
    next(err);
  }
});

router.get("/search/:query", async (request, response, next) => {
  try {
    const products = await productLogic.searchProductsAsync(
      request.params.query
    );
    response.json(products);
  } catch (err) {
    next(err);
  }
});



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
