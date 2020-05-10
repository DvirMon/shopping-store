const Joi = require("Joi");

const pattern = {
  name: /^[a-zA-Z ]{3,25}$/,
  creditCard: /^d{4}$/,
  positive: /^[1-9]+[0-9]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
  email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
};

const formatMessage = (error) => {
  if ((error.type = "string.regex.base")) {
    return (error.message = "invalid email format");
  }
};

// auth validation
const loginValidation = (request, response, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .regex(pattern.email)
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          formatMessage(err);
        });
        return errors;
      }),
    password: Joi.string().min(8).max(24).required(),
  });

  const error = schema.validate(request.body, { abortEarly: false }).error;
  return returnMessage(error, next);
};

const registerValidation = (request, response, next) => {
  const schema = Joi.object().keys({
    personalId: Joi.string().required(),
    email: Joi.string()
      .regex(pattern.email)
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          formatMessage(err);
        });
        return errors;
      }),
    password: Joi.string().min(8).max(24).required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .options({
        language: {
          any: {
            allowOnly: "!!Passwords do not match",
          },
        },
      }),
    city: Joi.string().required(),
    street: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  const error = schema.validate(request.body, { abortEarly: false }).error;
  return returnMessage(error, next);
};
// --------------------------------------------------------------------------------------------------
// end of auth validation

// product validation scheme

const productValidation = (request, response, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().regex(pattern.positive).required(),
    imagePath: Joi.string().required(),
  });

  const error = schema.validate(request.body, { abortEarly: false }).error;
  return returnMessage(error, next);
};
// end of product validation

// cart validation scheme
const cartItemValidation = (request, response, next) => {
  const schema = Joi.object().keys({
    product: Joi.string().required(),
    quantity: Joi.string().regex(pattern.positive).required(),
    totalPrice: Joi.string().regex(pattern.positive).required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
  });

  const error = schema.validate(request.body, { abortEarly: false }).error;
  return returnMessage(error);
};

// order validation scheme
const orderValidation = (request, response, next) => {
  const schema = Joi.object().keys({
    client: Joi.string().required(),
    product: Joi.string().required(),
    cart: Joi.string().required(),
    totalPrice: Joi.number().regex(pattern.positive).required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    shipmentDate: Joi.date().iso().required(),
    orderDate: Joi.date().iso().required(),
    creditCard: Joi.number().regex(pattern.creditCard).required(),
  });

  const error = schema.validate(request.body, { abortEarly: false }).error;
  return returnMessage(error, next);
};

const returnMessage = (error, next) => {
  if (error) {
    const message = error.details.map((err) => err.message);
    return next({ status: 404, message });
  }
  next();
};

module.exports = {
  loginValidation,
  registerValidation,
  productValidation,
  cartItemValidation,
  orderValidation,
};
