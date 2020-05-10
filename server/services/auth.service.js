const jwt = require("jsonwebtoken");
global.config = require('../config.json')


// function to create an access token
const setToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { sub: user.uuid, role: user.role },
      config.jwt.actKey,
      { expiresIn: "20m" },
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
      { sub: user.uuid, role: user.role },
      config.jwt.refKey,
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


module.exports = {
  setToken,
  setRefreshToken,
};
