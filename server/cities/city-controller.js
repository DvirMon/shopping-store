const express = require("express");

const router = express.Router();

const cityLogic = require("./city-logic");

router.get("/", async (request, response, next) => {
  try {
    const cities = await cityLogic.getAllCities();
    response.json(cities);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
