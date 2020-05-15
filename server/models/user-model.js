const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const ValidationError = mongoose.Error.ValidationError;
const ValidatorError = mongoose.Error.ValidatorError;

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
      validate: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "email format is not valid",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password must be 8-24 characters long"],
      maxlength: [24, "password must be 8-24 characters long"],
    },
    firstName: {
      type: String,
      required: true,
      minlength: [3],
      maxlength: [30],
      validate: [/^[a-zA-Z ]{3,25}$/, "first name must contain only letters"],
    },
    lastName: {
      type: String, 
      required: true,
      minlength: [3],
      maxlength: [30],
      validate: [/^[a-zA-Z ]{3,25}$/, "last name must contain only letters"],
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
