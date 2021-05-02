require("./data-access-layer/dal");
require('dotenv').config()

// IMPORT MODULES
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

// IMPORT 
const path = require("path"); 
const config = require('./config')

// init server
const server = express();

const PORT = process.env.PORT || 3000;

// IMPORT MIDDLEWARE
const handleErrors = require("./middleware/handleErrors");
const sanitize = require("./middleware/handleTags");

// IMPORT CONTROLLERS
const authController = require("./controllers/auth.controller");
const tokenController = require('./controllers/token.controller')
const cartController = require("./controllers/cart-controller");
const cartItemController = require("./controllers/cart-item-controller");
const orderController = require("./controllers/order-controller");
const productController = require("./controllers/product-controller");
const validationController = require('./controllers/validation.controller')
const resetController = require('./controllers/reset.controller')

// MIDDLEWARE METHODS     
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
server.use(session(config.session))
server.use(sanitize);
server.use("/uploads", express.static("uploads"));
server.use(compression());


// MIDDLEWARE CONTROLLERS
server.use("/api/auth", authController);
server.use("/api/carts", cartController);
server.use("/api/cart-item", cartItemController);
server.use("/api/orders", orderController);
server.use("/api/products", productController);
server.use("/api/valid", validationController);
server.use("/api/reset", resetController);
server.use("/api/token", tokenController);

if (process.env.NODE_ENV === "production") {

  server.use(express.static("public/client"));

  console.log("production")

  server.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "public/client", "index.html"));
  });
}

server.use(handleErrors);

server.listen(PORT, () => console.log("Express is working on port " + PORT));
