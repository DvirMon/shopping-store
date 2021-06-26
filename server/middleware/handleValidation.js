
const User = require('../models/user-model')

const messageService = require('../services/message')
const schemaService = require('../services/schema')

const authorize = require('./handleAuth')
const reCaptcha = require('./handleReCaptcha')

// validate scheme
const validateScheme = (callback) => (request, response, next) => {

  const value = request.body.data ? request.body.data : request.body

  const schema = callback()

  const errors = schema.validate(value, { abortEarly: false }).error;

  const message = messageService.getMessage(errors);

  if (message) {
    next({ status: 404, message })

  }
  next()
};

const isUserExist = async (request, response, next) => {

  try {

    const data = request.body.data ? request.body.data : request.body

    if (data.email) {

      const user = await User.findUser(data.email.toLowerCase());

      if (!user) {
        next({ status: 404, message: "No account with that email exist" });
      }
      request.user = user
    }
    next()
  }
  catch (err) {
    next(err)
  }
}

const isContactEmailExist = async (request, response, next) => {

  const contact = request.body.contact

  if (contact && contact.includes("@")) {
    request.body.email = contact
  }
  next()
}


// main middleware for contact form
const loginForm = () => {
  return [
    reCaptcha,
    validateScheme(schemaService.loginScheme),
    isUserExist,
  ]
}

const loginGoogle = () => {
  return [
    reCaptcha,
    validateScheme(schemaService.loginGoogleScheme),
  ]
}

// main middleware for contact form
const registerForm = () => {

  return [
    reCaptcha,
    validateScheme(schemaService.registerSchema),
  ]
}

// main middleware for contact form
const contactEmailForm = () => {
  return [
    validateScheme(schemaService.contactFormSchema),
    isContactEmailExist,
    isUserExist
  ]
  
}
// main middleware for contact form
const contactPhoneForm = () => {
  return [
    validateScheme(schemaService.contactFormSchema),
  ]
  
}

// main middleware for new password form
const newPasswordForm = () => {
  return [
    // authorize(false, process.env.JWT_CONFIRMATION),
    validateScheme(schemaService.newPasswordScheme),
    isUserExist
  ]
}


module.exports = {
  loginForm,
  loginGoogle,
  registerForm,
  contactEmailForm,
  contactPhoneForm,
  newPasswordForm
}
