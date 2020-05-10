require('./data-access-layer/dal')
const express = require("express");
const cors = require("cors");
global.config = require('./config.json');

const server = express()

// import controllers
const cartsController = require('./controllers/cart-controller')
const ordersController = require('./controllers/order-controller')
const productsController = require('./controllers/product-controller')

// import middleware 
const handleErrors = require('./middleware/handleErrors')
 
// middleware
server.use(cors())
server.use(express.json())

server.use("/api/carts", cartsController)
server.use("/api/orders", ordersController)
server.use("/api/products", productsController)

server.use(handleErrors)

server.listen(config.port, () => console.log(`Listening to http://localhost:${config.port}`))