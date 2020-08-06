require("./data-access-layer/dal");
require('dotenv').config()

const express = require("express");
const server = express();

const PORT = process.env.PORT || 3000;

// import middleware
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const handleErrors = require("./middleware/handleErrors");
const sanitize = require("./middleware/handleTags");

// import controllers     
const authController = require("./controllers/auth.controller");
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
server.use(express.json({ limit: "50mb" }));
server.use(sanitize);
server.use("/uploads", express.static("uploads"));
server.use(compression());

server.use("/api/auth", authController);
server.use("/api/carts", cartController);
server.use("/api/cart-item", cartItemController);
server.use("/api/orders", orderController);
server.use("/api/products", productController);

if (process.env.NODE_ENV === "production") {
  server.use(express.static("public/client"));

  server.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "public/client", "index.html"));
  });
}

server.use(handleErrors);

server.listen(PORT, () => console.log("Express is working on port " + PORT));
