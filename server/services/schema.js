const Joi = require("joi");
const messageService = require('./message')


const regex = {
  name: /^[a-zA-Z ]{3,25}$/,
  personalId: /^[0-9]{8,9}$/,
  email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  positive: /^[1-9]+[0-9]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
  emailPhone: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})|(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/,
  cc: {
    amex: /^3[47]\d{2}(\s?\d{6})(\s?\d{5})$/,
    jcb: /^(?:2131|1800|35\d{2})(\s?)\d{4}\1\d{4}\1\d{4}$/,
    masterCard: /^5[1-5]|2[2-7]\d{2}(\s?)\d{4}\1\d{4}\1\d{4}$/,
    visa: /^4\d{3}(\s?)\d{4}\1\d{4}\1\d{4}$/,
  },
};


// joi schema for login
const loginScheme = () => {
  return Joi.object().keys({
    email: Joi.string().regex(regex.email).required(),
    password: Joi.string().min(8).max(24).required(),
  })
};

const loginGoogleScheme = () => {
  return Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().regex(regex.email).required(),
  }).unknown()
};

// joi schema for register
const registerSchema = () => {
  return Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().regex(regex.email).required(),
    password: Joi.required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  });
}


// joi schema for product
const productSchema = () => {
  return Joi.object().keys({
    name: Joi.string().required(),
    categoryId: Joi.string().required(),
    price: Joi.number.regex(regex.positive).required(),
    imagePath: Joi.string().required(),
  })
}

// joi schema for contact
const contactFormSchema = () => {
  return Joi.object().keys({
    contact: Joi.string().regex(regex.emailPhone).required(),
  })
}

// joi schema for new password
const newPasswordScheme = () => {
  return Joi.object().keys({
    email: Joi.string().regex(regex.email).required(),
    password: Joi.required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  });

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



module.exports = {
  validCreditCard,

  loginScheme,
  loginGoogleScheme,
  registerSchema,
  productSchema,
  contactFormSchema,
  newPasswordScheme,
};
