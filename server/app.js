require('./data-access-layer/dal')
global.config = require('./config.json');
const express = require("express");
const server = express()

// import middleware 
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const handleErrors = require('./middleware/handleErrors')
const sanitize = require("./middleware/handleTags");

// import controllers
const cartController = require('./controllers/cart-controller')
const cartItemController = require('./controllers/cart-item-controller')
const orderController = require('./controllers/order-controller')
const productController = require('./controllers-router/products.router')

 
// middleware
server.use(cors())
server.use("/api/", rateLimit({
  windowMs: 1000, 
  max: 5, 
  message: "Are You a Hacker?" 
}));
server.use(express.json());
server.use(sanitize); 
server.use('/uploads', express.static('uploads'));

// controllers 
server.use("/api/carts", cartController)
server.use("/api/cart-item", cartItemController)
server.use("/api/orders", orderController)
server.use("/api/products", productController)

server.use(handleErrors)

server.listen(config.port, () => console.log(`Listening to http://localhost:${config.port}`))