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

const setTemplate = async ({ type, name, code }) => {

  return new Promise((resolve, reject) => {

    console.log(type)

    const emailPath = path + (type === 'reset' ? "/views/reset.ejs" : "/views/password.ejs")

    console.log(emailPath)

    ejs.renderFile(
      emailPath,
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



const send = async (type, email, name, code) => {
  console.log(email)
  const html = await setTemplate({ type, name, code });
  await setEmail(html, email)
}


module.exports = {
  send
}