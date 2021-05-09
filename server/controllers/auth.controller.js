const express = require("express");
const router = express.Router();

const User = require("../models/user-model");

const authLogic = require("../business-layer-logic/auth-logic");

const tokenService = require("../services/token");
const middleware = require("../services/middleware");


router.post("/login",
  middleware.validate.loginForm(),
  async (request, response, next) => {
    try {

      const data = request.body.data ? request.body.data : request.body
      const user = request.user

      if (!await user.validatePassword(data.password)) {

        return next({
          status: 409,
          message: "email or password are incorrect",
        });
      }

      delete user.password;
      delete user.personalId;

      // get accessToken
      const token = await tokenService.getAccessToken(user);

      response.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login/google",
  middleware.validate.loginGoogle(),
  async (request, response, next) => {

    try {
      const gmailUser = request.body.data

      const user = await User.loginGoogle(gmailUser)

      delete user.password;
      delete user.personalId;
      
      // get accessToken
      const token = await tokenService.getAccessToken(user);

      response.json({ user, token });
    }

    catch (err) {
      next({ status: 409, message: err.message })
    }

  })


router.post(
  "/register",
  middleware.validate.registerForm,
  async (request, response, next) => {
    try {

      const payload = request.body.data

      const user = await authLogic.addUserAsync(payload);

      delete user.password;
      delete user.personalId;

      // get accessToken
      const token = await tokenService.getAccessToken(user);

      response.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
