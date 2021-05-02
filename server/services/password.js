const generator = require("generate-password");

const getPassword = () => {
  return generator.generate({
    length: 6,
    numbers: true,
    uppercase: false,
    lowercase: false
  });
};

module.exports = { getPassword }

