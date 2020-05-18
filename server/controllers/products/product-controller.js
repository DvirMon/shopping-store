const express = require("express");
const router = express.Router();
const productLogic = require("../../business-layer-logic/product-logic");

// get total store products
router.get("/total", async (request, response, next) => {
  try {
    const totalDocs = await productLogic.getTotalDocsAsync();
    response.json(totalDocs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;