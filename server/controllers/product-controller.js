const express = require("express");
const router = express.Router();

const Product = require("../models/product-model");
const productLogic = require("../business-layer-logic/product-logic");
const middleware = require("../middleware/middleware");

const key = config.secret.access;

router.get(
  "/categories",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const categories = await productLogic.getAllCategories();
      response.json(categories);
    } catch (err) {
      next(err);
    }
  }
);

// get total store products
router.get("/total", async (request, response, next) => {
  try {
    const totalDocs = await productLogic.getTotalDocsAsync();
    response.json(totalDocs);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/pagination/:page/:limit",
  // middleware.authorize(true, key),
  middleware.pagination,
  async (request, response, next) => {
    try {
      console.log(1);
      const data = await productLogic.getProductsPaginationAsync(
        {},
        request.options
      );

      const products = data.docs;
      const pagination = { ...data };
      delete pagination.docs;

      response.json({ products, pagination });
    } catch (err) {
      next(err);
    }
  }
);

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

      response.json({ products, pagination });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/category/:categoryId",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const products = await productLogic.getAllProductsByCategoryAsync(
        request.params.categoryId
      );

      if (products.length === 0) {
        return next({ status: 404, message: "no content" });
      }

      response.json(products);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.get(
  "/search/:query",
  middleware.authorize(false, key),
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

router.get(
  "/:_id",
  middleware.authorize(false, key),
  async (request, response, next) => {
    try {
      const product = await productLogic.getProductAsync(request.params._id);
      response.json(product);
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
