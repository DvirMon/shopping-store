const express = require("express");
const router = express.Router();

const Client = require("./client-model");
const authLogic = require("./auth-logic");
const validation = require("../services/validation.service");
const bcrypt = require("bcryptjs");

router.post(
  "/login",
  validation.loginValidation,
  async (request, response, next) => {
    try {
      // get user from db
      const user = await authLogic.getUserAsync(request.body.email);

      if (!user) {
        return next({
          status: 409,
          message: "username or password are incorrect",
        });
      }

      // validate password
      const validPassword = await bcrypt.compare(
        request.body.password,
        user.password
      );

      if (!validPassword) {
        return next({
          status: 409,
          message: "username or password are incorrect",
        });
      }

      user.password = undefined;

      response.json(user);
    } catch (err) {
      next(err);
    }
  }
);



router.post(
  "/register",
  validation.registerValidation,
  async (request, response, next) => {
    try {
      
      // validate unique email
      Client.schema.path("email").validate(async (email) => {
        const emailCount = await Client.countDocuments({ email });
        return !emailCount;
      }, next({ status: 409, message: request.body.email + " is already in use" }));



      // save in database
      const user = await authLogic.addUserAsync(new Client(request.body));

      response.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
