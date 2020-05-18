global.config = require('./config.json');
require('./data-access-layer/dal')

const express = require("express");
const server = express()

// import controllers
const authController = require('./controllers/auth.controller')

// import middleware 
const cors = require("cors");
const handleErrors = require('./middleware/handleErrors')
const sanitize = require("./middleware/handleTags");
const rateLimit = require("express-rate-limit");

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
server.use('/api/auth', authController)

server.use(handleErrors)

server.listen(config.portAuth, () => console.log(`Listening to http://localhost:${config.portAuth}`))