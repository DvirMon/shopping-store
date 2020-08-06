const jwt = require("jsonwebtoken");
const generator = require("generate-password");

const generatePassword = () => {
  return generator.generate({
    length: 24,
    numbers: true,
  });
};

// function to create an access token
const setAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user },
      process.env, JWT_ACCESS,
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
    jwt.sign({ user }, process.env, JWT_REFRESH, { expiresIn: "3d" },
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
  generatePassword,
  setAccessToken,
  setRefreshToken,
};
