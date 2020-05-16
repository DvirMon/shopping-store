const Joi = require("Joi");

const pattern = {
  name: /^[a-zA-Z ]{3,25}$/,
  creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  positive: /^[1-9]+[0-9]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
  email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
};

// auth validation for login
const loginValidation = (request, response, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().regex(pattern.email).required(),
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
// --------------------------------------------------------------------------------------------------
// end of auth validation

// order date validation scheme
const dateFormatValidation = (request, response, next) => {
  const schema = Joi.object()
    .keys({
      shipmentDate: Joi.date().iso().required(),
      orderDate: Joi.date().iso(),
    })
    .unknown();

  const error = schema.validate(request.body, { abortEarly: false }).error;
  return returnMessage(error, next);
};

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
  dateFormatValidation,
  pattern,
};
