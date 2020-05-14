global.config = require("../config.json");

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/user-model");
const authLogic = require("../business-layer-logic/auth-logic");
const validation = require("../services/validation.service");
const jwt = require("../services/auth.service");
const authorize = require("../middleware/handleAuth");

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
      user.personalId = undefined;

      // set token
      const token = await jwt.setAccessToken(user);

      response.json(token);
    } catch (err) {
      next(err);
    }
  }
);

// get refresh token when login
router.get(
  "/refresh-token",
  authorize(0, config.secret.access),
  async (request, response) => {
    try {
      const payload = request.user;

      const refreshToken = await jwt.setRefreshToken(payload);

      response.json(refreshToken);
    } catch (err) {
      next(err);
    }
  }
);
// get access token with refresh token
router.get(
  "/access-token",
  authorize(0, config.secret.refresh),
  async (request, response) => {
    try {
      const payload = request.user;
      console.log(payload)

      const accessToken = await jwt.setAccessToken(payload);

      response.json(accessToken);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/register",
  validation.matchPasswordValidation,
  async (request, response, next) => {
    try {
      const user = await authLogic.addUserAsync(new User(request.body));

      // set token
      const token = await jwt.setAccessToken(user);

      response.status(201).json(token);
    } catch (err) {
      next(err);
    }
  }
);

// valid for unique id
router.post("/register/unique-personalId", async (request, response, next) => {
  try {
    const countId = await authLogic.validUniquePersonalIdAsync(
      request.body.personalId
    );
    response.json(!countId);
  } catch (err) {
    next(err);
  }
});

// valid for unique email
// I didn't valid email format because I will valid it in the register request
router.post("/register/valid-email", async (request, response, next) => {
  try {
    const countEmail = await authLogic.validUniqueEmailAsync(
      request.body.email
    );
    response.json(!countEmail);
  } catch (err) {
    next(err);
  }
});

module.exports = router;