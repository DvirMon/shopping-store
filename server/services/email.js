// IMPORTS

const nodemailer = require('nodemailer');
const ejs = require('ejs')
const path = require('./path');

// NODEMAILER LOGIC

const handleTransporter = () => {


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.USER_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    }
  });

  return transporter
}

const setEmail = async (html, email) => {

  await handleTransporter().sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'Reset Password',
    html
  });

}

const setTemplate = async (name, code) => {

  return new Promise((resolve, reject) => {

    ejs.renderFile(
      path + "/views/reset.ejs",
      {
        name,
        code
      },
      (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      })
  })

}



const send = async (email, name, code) => {
  const html = await setTemplate(name, code);
  await setEmail(html, email)
}


module.exports = {
  send
}