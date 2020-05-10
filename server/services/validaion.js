const Joi = require("Joi");

const pattern = {
  name: /^[a-zA-Z ]{3,25}$/,
  creditCard: /^d{4}$/,
  positive: /^[1-9]+[0-9]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
};

// auth validation

const loginValidation = (login) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.number().min(8).max(24).required(),
  });

  const error = schema.validate(register, { abortEarly: false }).error;
  returnMessage(error);
};

const registerValidation = (register) => {
  const schema = Joi.object().keys({
    personalId : Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.number().min(8).max(24).required(),
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

  const error = schema.validate(register, { abortEarly: false }).error;
  returnMessage(error);
};
// --------------------------------------------------------------------------------------------------
// end of auth validation

// product validation scheme

const productValidation = (product) => {
  
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().regex(pattern.positive).required(),
    imagePath: Joi.string().required(),
  });
  
  const error = schema.validate(product, { abortEarly: false }).error;
  returnMessage(error)
};
// end of product validation


// cart validation scheme
const cartItemValidation = (cartItem) => {
  
  const schema = Joi.object().keys({
    product:Joi.string().required(),
    quantity:Joi.string().regex(pattern.positive).required(),
    totalPrice:Joi.string().regex(pattern.positive).required(),
    city:Joi.string().required(),
    street:Joi.string().required(),
    { versionKey: false
    });
    
    const error = schema.validate(cartItem, { abortEarly: false }).error;
    returnMessage(error)
  };
  const cartValidation = (cart) => {
    
    const schema = Joi.object().keys({
      client: Joi.string().required(),
      creatSDate: Joi.date().iso().required(),
    });
    
    const error = schema.validate(cart, { abortEarly: false }).error;
    returnMessage(error)
  };
  // end of cart validation
  
  // order validation scheme
  const orderValidation = (order) => {
    
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

  const error = schema.validate(order, { abortEarly: false }).error;
  returnMessage(error)
};

const returnMessage = (error) => {
  if (error) {
    return error.details.map((err) => err.message);
  }
  return null;
};

module.exports = {
  loginValidation,
  registerValidation,
  productValidation,
  cartValidation,
  orderValidation,
};
