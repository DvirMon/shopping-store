// METHODS
const reCaptcha = require('../middleware/handleReCaptcha')
const pagination = require("../middleware/handlePagination");
const formatPhone = require('../middleware/handleFormat')
const authorize = require("../middleware/handleAuth");

// OBJECTS
const validate = require('../middleware/handleValidation')
const file = require("../middleware/handleFiles");

module.exports = {
  reCaptcha,
  pagination,
  formatPhone,
  authorize,
  validate,
  file, 
};
