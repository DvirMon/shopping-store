const mongoose = require("mongoose");
// const uniqueEmail = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const ClientSchema = mongoose.Schema(
  {
    role: { type: Boolean, default: false },
    personalId: { type: String },
    email: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    city: { type: String },
    street: { type: String },
  },
  { versionKey: false }
);


// hush password
ClientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

//  // validate unique email
//  Client.schema.path("email").validate(async (email) => {
//   const emailCount = await Client.countDocuments({ email });
//   return !emailCount;
// }, next({ status: 409, message: request.body.email + " is already in use" }));

module.exports = mongoose.model("Client", ClientSchema, "clients");
