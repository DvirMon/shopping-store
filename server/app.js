require('./data-access-layer/dal')
const express = require("express");
const cors = require("cors");
global.config = require('./config.json');

const server = express()

// import controllers
const cartController = require('./controllers/cart-controller')
const cartItemController = require('./controllers/cart-item-controller')
const orderController = require('./controllers/order-controller')
const productController = require('./controllers/product-controller')

// import middleware 
const handleErrors = require('./middleware/handleErrors')
 
// middleware
server.use(cors())
server.use(express.json())
 
server.use("/api/carts", cartController)
server.use("/api/cart-items", cartItemController)
server.use("/api/orders", orderController)
server.use("/api/products", productController)

server.use(handleErrors)

server.listen(config.port, () => console.log(`Listening to http://localhost:${config.port}`))