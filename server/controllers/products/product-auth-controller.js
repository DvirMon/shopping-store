const express = require("express");
const router = express.Router();

const productLogic = require("../../business-layer-logic/product-logic");
const authorize = require("../../middleware/handleAuth");

const key = config.secret.access;

// router.use(authorize(false, key));

router.get("/", async (request, response, next) => {
  try {
    const products = await productLogic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/categories", async (request, response, next) => {
  try {
    const categories = await productLogic.getAllCategories();
    response.json(categories);
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
    console.log(err);
    next(err);
  }
});

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

module.exports = router;
