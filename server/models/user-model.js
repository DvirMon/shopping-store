const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const bcrypt = require("bcryptjs");
const validation = require("../services/validation.service");

const UserSchema = mongoose.Schema(
  {
    isAdmin: { type: Boolean, default: false },
    personalId: {
      type: String,
      required: true,
      unique: true,
      minlength: [8],
      maxlength: [9],
      validate: [validation.regex.personalId, "id is not valid"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [10],
      maxlength: [30],
      validate: [validation.regex.email, "email format is not valid"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password must be 8-24 characters long"],
      maxlength: [24, "password must be 8-24 characters long"],
      validate: [
        validation.regex.password,
        "first name must contain only letters",
      ],
    },
    firstName: {
      type: String,
      required: true,
      minlength: [3],
      maxlength: [30],
      validate: [
        validation.regex.name,
        "first name should only include a-z/A-Z characters",
      ],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3],
      maxlength: [30],
      validate: [
        validation.regex.name,
        "last name should only include a-z/A-Z characters",
      ],
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
