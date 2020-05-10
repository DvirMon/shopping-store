require('./data-access-layer/dal')
const express = require("express");
const cors = require("cors");
global.config = require('./config.json');

const server = express()

// import controllers
const authController = require('./auth/auth.controller')

// import middleware 
const handleErrors = require('./middleware/handleErrors')
 
// middleware
server.use(cors())
server.use(express.json())
 
server.use('/api/auth', authController)

server.use(handleErrors)

server.listen(config.portAuth, () => console.log(`Listening to http://localhost:${config.portAuth}`))