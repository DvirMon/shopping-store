const express = require('express')

const router = express.Router()

const Product = require('../models/product')

const productLogic = require('../business-logic-layer/product-logic')

router.get("/", async (request, response, next) => {
  try {
    const products = await productLogic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const product = await productLogic.addProductAsync(new Product(request.body));
    response.status(201).json(product);
  } catch (err) {
    next(err);
  }
});


module.exports = router