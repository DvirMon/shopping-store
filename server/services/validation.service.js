const Joi = require("joi");

const regex = {
  name: /^[a-zA-Z ]{3,25}$/,
  personalId: /^[0-9]{8,9}$/,
  email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  positive: /^[1-9]+[0-9]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
  cc: {
    amex: /^3[47]\d{2}(\s?\d{6})(\s?\d{5})$/,
    jcb: /^(?:2131|1800|35\d{2})(\s?)\d{4}\1\d{4}\1\d{4}$/,
    masterCard: /^5[1-5]|2[2-7]\d{2}(\s?)\d{4}\1\d{4}\1\d{4}$/,
    visa: /^4\d{3}(\s?)\d{4}\1\d{4}\1\d{4}$/,
  },
};

// auth validation for login
const loginValidation = (request, response, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().regex(regex.email).required(),
    password: Joi.string().min(8).max(24).required(),
  });

  const error = schema.validate(request.body, { abortEarly: false }).error;
  return returnMessage(error, next);
};

// validation for password confirmation
const matchPasswordValidation = (request, response, next) => {

  const schema = Joi.object()
    .keys({
      password: Joi.required(),
      confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    })
    .unknown();

  const error = schema.validate(request.body, { abortEarly: false }).error;
  return returnMessage(error, next);
};

const validCreditCard = (cc) => {

  if (!cc) {
    return;
  }

  if (
    regex.cc.amex.test(cc) ||
    regex.cc.jcb.test(cc) ||
    regex.cc.masterCard.test(cc) ||
    regex.cc.visa.test(cc)
  ) {
    return true;
  }

  return false;
};

// --------------------------------------------------------------------------------------------------
// end of auth validation

const returnMessage = (errors, next) => {
  if (errors) {
    const error = errors.details.map((error) => errorFormat(error));
    return next({ status: 404, message: error[0] });
  }
  next();
};

const errorFormat = (error) => {
  error.path = error.context.key;
  error.value = error.context.value;
  delete error.context;
  return formatMessage(error);
};

const formatMessage = (error) => {
  if (error.type === "string.regex.base") {
    error.message = "invalid email format";
  }
  if (error.type === "date.isoDate") {
    error.message = "invalid date format";
  }
  if (error.type === "any.allowOnly") {
    error.message = "passwords do not match";
  }
  if (error.type === "any.empty") {
    error.message = error.path + " is required";
  }
  return error;
};

module.exports = {
  loginValidation,
  matchPasswordValidation,
  validCreditCard,
  regex,
};
