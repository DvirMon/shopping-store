const config = require("../config");

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const axios = require("axios");

const User = require("../models/user-model");
const authLogic = require("../business-layer-logic/auth-logic");
const auth = require("../services/auth.service");
const validation = require("../services/validation.service");
const middleware = require("../middleware/middleware");


router.get("/password", async (request, response, next) => {
  try {
    const password = await auth.generatePassword();
    response.json(password);
  } catch (err) {
    next(err);
  }
});

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
          message: "email or password are incorrect",
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
          message: "email or password are incorrect",
        });
      }

      user.password = undefined;
      user.personalId = undefined;

      // get accessToken
      const token = await auth.setAccessToken(user);

      response.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login/google", async (request, response, next) => {
  
  try {
    const email = request.body.email

    if(!email)
    return next({
      status: 404,
      message: "Email is Missing",
    });

    const user = await authLogic.getUserAsync(email)

    if (!user) {
      return next({
        status: 409,
        message: "There is no user with this email, please register first",
      });
    }
     // get accessToken
     const token = await auth.setAccessToken(user);

     response.json({ user, token });
  } 

  catch (err) {
    next(err)
  }

})

// get refresh token after login
router.get(
  "/refresh-token",
  middleware.authorize(0, process.env.JWT_ACCESS),
  async (request, response, next) => {
    try {
      const user = request.user;

      // get refreshToken
      const token = await auth.setRefreshToken(user);
      response.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
);

// get refresh token when expired
router.post("/refresh-token", async (request, response, next) => {
  try {
    const user = request.body;

    // verify that user exist in db
    const isExist = authLogic.isUserExist(user._id);
    if (!isExist) {
      return next({ status: 404 });
    }

    // get refreshToken
    const token = await auth.setRefreshToken(user);

    response.json({ user, token });
  } catch (err) {
    next(err);
  }
});

// get access token with refresh token
router.get(
  "/access-token",
  middleware.authorize(0, process.env.JWT_REFRESH),
  async (request, response, next) => {
    try {
      const payload = request.user;
      const accessToken = await auth.setAccessToken(payload);

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

      // get accessToken
      const token = await auth.setAccessToken(user);

      response.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
);

// valid for unique id
router.post("/unique-personalId", async (request, response, next) => {
  try {
    const countId = await authLogic.validUniquePersonalIdAsync(
      request.body.personalId
    );
    response.json(!!countId);
  } catch (err) {
    next(err);
  }
});

// valid for unique email
router.post("/unique-email", async (request, response, next) => {
  try {
    const countEmail = await authLogic.validUniqueEmailAsync(
      request.body.email
    );
    response.json(!!countEmail);
  } catch (err) {
    next(err);
  }
}); 

// captcha
router.post("/captcha", async (request, response, next) => {
  if (!request.body.captcha) {
    next({ status: 400 });
    return;
  }
  const verifyCaptcha = `secret=${process.env.CAPTCHA_SECRET}&response=${request.body.captcha}`;

  try {
    const data = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?${verifyCaptcha}`
    );
    response.json(data.data.success);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
