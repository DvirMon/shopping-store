const jwt = require("jsonwebtoken");
global.config = require("../config.json");

// function to create an access token
const setAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user },
      config.secret.access,
      { expiresIn: "5m" },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
// end of function

// function to create a refresh token
const setRefreshToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user },
      config.secret.refresh,
      { expiresIn: "3d" },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
// end of function

// verify user

module.exports = {
  setAccessToken,
  setRefreshToken,
};

