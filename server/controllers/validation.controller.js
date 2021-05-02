const express = require("express");
const router = express.Router();
const authLogic = require("../business-layer-logic/auth-logic");

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

module.exports = router