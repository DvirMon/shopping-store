require('./data-access-layer/dal')
const express = require("express");
const cors = require("cors");
global.config = require('./config.json');

const server = express()

// import controllers
const cityController = require('./cities/city-controller')
const cartController = require('./carts/cart-controller')
const orderController = require('./orders/order-controller')
const productController = require('./products/product-controller')

// import middleware 
const handleErrors = require('./middleware/handleErrors')
 
// middleware
server.use(cors())
server.use(express.json())

server.use("/api/cities", cityController)
server.use("/api/carts", cartController)
server.use("/api/orders", orderController)
server.use("/api/products", productController)

server.use(handleErrors)

server.listen(config.port, () => console.log(`Listening to http://localhost:${config.port}`))