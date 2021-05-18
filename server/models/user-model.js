const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [10],
      maxlength: [30],
    },
    password: {
      type: String,
      // validate: [
      //   validation.regex.password,
      //   "password must conation at least one number, character a-z, A-Z",
      // ],
    },
    firstName: { 
      type: String,
      required: true,
      minlength: [3],
      maxlength: [30],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3],
      maxlength: [30],
    },
  },
  { versionKey: false }
);

// VIRTUALS

UserSchema.virtual("fullName").get(function () {
  return this.getFullName()
})


UserSchema.statics.findUser = async function (email) {
  return await this.findOne({ email })
}

UserSchema.statics.loginGoogle = async function (gmailUser) {

  const user = await this.findUser(gmailUser.email)

  if (!user) {

    // sign in with google
    return await User.create(gmailUser) 
  }

  return user
}



UserSchema.methods.validatePassword = async function (password) {
  // validate password

  return await bcrypt.compare(
    password,
    this.password ? this.password : ""
  );
}

UserSchema.methods.updatePassword = async function (password) {
  this.password = password
  await this.save()
  return this
}

UserSchema.methods.getFullName = function () {
  return this.firstName + " " + this.lastName
}

// validate unique email and personalId
UserSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
  message: "This {PATH} ({VALUE}) is already in use",
});

// UserSchema.path('email').validate(async (email) => {
//   const emailCount = await mongoose.models.users.countDocuments({ email })
//   return !emailCount
// }, 'Email already exists')

// hush password
UserSchema.pre("save", async function (next) {

  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});


const User = mongoose.model("User", UserSchema, "users");
module.exports = User