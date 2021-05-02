const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

const ResetSchema = new mongoose.Schema(
  {
    contact: {
      type: String,
      unique: true
    },
    code: {
      type: String
    }
  },
  { versionKey: false }
)



ResetSchema.statics.findEntry = async function (contact) {
  return await this.findOne({ contact })
}

// VALIDATION
ResetSchema.statics.validateNewPassword = function () {
  return resetRules.validateNewPassword()
}

ResetSchema.statics.getEntry = async function (payload) {

  const reset = await this.findEntry(payload.contact)

  if (!reset) {

    return await Reset.create({ contact: payload.contact, code: payload.code })
  }

  // update code
  reset.code = payload.code
  await reset.save();

  return reset
}

ResetSchema.methods.validateCode = async function (code) {
  // validate password

  return await bcrypt.compare(
    code,
    this.code
  );
} 

ResetSchema.methods.formatPhone = function (contact) {
  if (contact.startsWith("0")) {
    contact = contact.substring(1)
  }
  return "+972" + contact
}

ResetSchema.methods.delete = async function () {
  return await this.deleteOne({ contact: this.contact })
}

ResetSchema.pre("save", async function (next) {
  this.code = await bcrypt.hash(this.code, 12);
  return next();
});


const Reset = mongoose.model("Reset", ResetSchema);
module.exports = Reset