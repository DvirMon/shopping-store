require("./data-access-layer/dal");
global.config = require("./config.json");
const express = require("express");
const server = express();

const PORT = process.env.PORT | config.port


// import middleware
const cors = require("cors");
const compression = require('compression')
const rateLimit = require("express-rate-limit");
const handleErrors = require("./middleware/handleErrors");
const sanitize = require("./middleware/handleTags");

// import controllers
const cartController = require("./controllers/cart-controller");
const cartItemController = require("./controllers/cart-item-controller");
const orderController = require("./controllers/order-controller");
const productController = require("./controllers/product-controller");

// middleware
server.use(cors());
server.use(
  "/api/",
  rateLimit({
    windowMs: 5000,
    max: 15, 
    message: "Are You a Hacker?",
  })
);
server.use(express.json({ limit: '50mb' }));
server.use(sanitize);
server.use("/uploads", express.static("uploads"));
server.use(compression())


// controllers
server.use("/api/carts", cartController);
server.use("/api/cart-item", cartItemController);
server.use("/api/orders", orderController);
server.use("/api/products", productController);

server.use(handleErrors);

server.listen(PORT, () =>
  console.log(`Listening to http://localhost:${PORT}`)
);
