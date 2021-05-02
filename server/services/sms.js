const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const send = async (to, body) => {
  const message = await client.messages
    .create({
      body : "Your confirmation code is : " + body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    })
}


module.exports = { send }