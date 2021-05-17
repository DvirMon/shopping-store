const express = require("express");
const router = express.Router();

const authLogic = require("../business-layer-logic/auth-logic");
const tokenService = require("../services/token");
const middleware = require("../services/middleware");


// get refresh token after login

router.get(
  "/refresh-token",
  middleware.authorize(false, process.env.JWT_ACCESS),
  async (request, response, next) => {
    try {

      const user = request.user;

      // get refreshToken
      const token = await tokenService.getRefreshToken(user);

      response.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
);

// get access token when expired
router.get(
  "/access-token",
  middleware.authorize(false, process.env.JWT_REFRESH),
  async (request, response, next) => {
    try {
      const user = request.user;
      const accessToken = await tokenService.getAccessToken(user);
      response.json(accessToken);
    } catch (err) {
      next(err);
    }
  }
);
 
// get refresh token when expired
router.post("/", async (request, response, next) => {
  try {
    const user = request.body;

    // verify that user exist in db
    const isExist = authLogic.isUserExist(user._id);
    if (!isExist) {
      return next({ status: 404 });
    }

    delete user.password;
    delete user.personalId;

    // get refreshToken
    const token = await tokenService.getRefreshToken(user);

    response.json({ user, token });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
