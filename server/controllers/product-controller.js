const express = require("express");
const router = express.Router();

const Product = require("../models/product-model");
const productLogic = require("../business-layer-logic/product-logic");
const middleware = require("../services/middleware");

const key = process.env.JWT_ACCESS;


// GET request - get products categories
router.get(
  "/categories",
  async (request, response, next) => {
    try { 
      const categories = await productLogic.getAllCategories();
      response.json(categories);
    } catch (err) {
      next(err);
    }
  }
);

// GET request- get total store products
router.get("/total", async (request, response, next) => {
  try {
    const totalDocs = await productLogic.getTotalDocsAsync();
    response.json(totalDocs);
  } catch (err) {
    next(err);
  }
});

// POST request - products pagination
router.post(
  "/pagination/:page/:limit",
  middleware.pagination,
  async (request, response, next) => { 
    try {
      const categoryId = request.body.categoryId;


      const data = await productLogic.getProductsPaginationAsync(
        categoryId ? { categoryId } : {},
        request.options
      );


      const products = data.docs;
      const pagination = { ...data };
      delete pagination.docs;

      return response.json({ products, pagination });
    } catch (err) {
      next(err);
    } 
  }
);

// GET request - search for product
router.get(
  "/search/:query",
  async (request, response, next) => {
    try {
      const products = await productLogic.searchProductsAsync(
        request.params.query
      );
      response.json(products);
    } catch (err) {
      next(err);
    }
  }
);


// add product only admin
router.post(
  "/",
  middleware.authorize(true, key),
  middleware.file.upload,
  async (request, response, next) => {
    try {
      const product = request.body;

      product.price = JSON.parse(request.body.price);
      delete product.alias;

      const addedProduct = await productLogic.addProductAsync(
        new Product(request.body)
      );
      response.status(201).json(addedProduct);
    } catch (err) {
      next(err);
    }
  }
);

// update product only admin
router.put(
  "/:_id",
  middleware.authorize(true, key),
  middleware.file.upload,
  async (request, response, next) => {
    try {

      const product = request.body;

      product._id = request.params._id;
      product.price = JSON.parse(request.body.price);
      delete product.alias;

      const updatedProduct = await productLogic.updateProductAsync(
        new Product(product)
      );
      response.json(updatedProduct);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
