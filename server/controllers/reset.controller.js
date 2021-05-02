const express = require("express");
const router = express.Router();

// MODELS
const Reset = require('../models/reset-model');
const User = require('../models/user-model')

// SERVICES 
const middleware = require("../services/middleware");
const confirmation = require('../services/password')
const sms = require('../services/sms');
const email = require('../services/email')
const tokenService = require('../services/token')

router.post("/code",
  middleware.validate.contactForm(),
  async (request, response, next) => {
    try {

      const contact = request.body.contact

      // generate code
      const code = confirmation.getPassword()

      // save code in database
      const reset = await Reset.getEntry({ contact, code })

      // save hash code in session
      // request.session.code = reset.code

      // create token with hash code
      const token = await tokenService.getConfirmationToken(contact)

      if (contact.includes("@")) {
        await email.send(contact, request.user.fullName, code)
      }
      else {

        const phone = reset.formatPhone(contact)
        await sms.send(phone, code)
      }
 
      response.json({ token , contact})
    }
    catch (err) {
      next(err)
    }

  })


router.post("/confirm",
  middleware.authorize(false, process.env.JWT_CONFIRMATION),
  async (request, response, next) => {

    try {
      const payload = request.body
      console.log(payload)

      const reset = await Reset.findEntry(request.contact)

      if (!reset || !await reset.validateCode(payload.code)) {
        return next({
          status: 409,
          message: "confirmation code is not valid or expired",
        });
      }
      reset.delete()
      response.json(true)
    }
    catch (err) {
      console.log(err)
      next(err)
    }
  })

router.post("/new-password",
  middleware.validate.newPasswordForm(),
  async (request, response, next) => {

    try {
      const payload = request.body

      const user = await request.user.updatePassword(payload.password)

      response.json({ message: "password updated!", user })
    }
    catch (err) {
      next(err)
    }
  })


module.exports = router;


