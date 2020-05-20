const express = require("express");
const router = express.Router();

const productsController = require('../controllers/products/product-controller')
const productsAuthController = require('../controllers/products/product-auth-controller')
const productsAdminController = require('../controllers/products/product-admin-controller')

router.use("/", productsController)
router.use("/auth", productsAuthController)
router.use("/admin", productsAdminController)

module.exports = router;

