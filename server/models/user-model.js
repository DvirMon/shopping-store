const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const ValidationError = mongoose.Error.ValidationError;
const ValidatorError = mongoose.Error.ValidatorError;

const pattern = {
  name: /^[a-zA-Z ]{3,25}$/,
  creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  positive: /^[1-9]+[0-9]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
  email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
};

const UserSchema = mongoose.Schema(
  {
    isAdmin: { type: Boolean, default: false },
    personalId: {
      type: String,
      required: true,
      unique: true,
      minlength: [9],
      maxlength: [10],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [10],
      maxlength: [30],
      validate: [pattern.email, "email format is not valid"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password must be 8-24 characters long"],
      maxlength: [24, "password must be 8-24 characters long"],
      validate: [pattern.password, "first name must contain only letters"],
    },
    firstName: {
      type: String,
      required: true,
      minlength: [3],
      maxlength: [30],
      validate: [pattern.name, "first name should only include a-z/A-Z characters"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3],
      maxlength: [30],
      validate: [pattern.name, "last name should only include a-z/A-Z characters"],
    },
    city: { type: String, required: true, minlength: [3], maxlength: [30] },
    street: { type: String, required: true, minlength: [5], maxlength: [30] },
  },
  { versionKey: false }
);

// validate unique email and personalId
UserSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
  message: "This {PATH} ({VALUE}) is already in use",
});

// hush password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

module.exports = mongoose.model("User", UserSchema, "users");
