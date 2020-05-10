const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema(
  {
    role: { type: Boolean, default: false },
    personalId: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String },
    street: { type: String },
  },
  { versionSey: false }
);

module.exports = mongoose.model('Client', ClientSchema, 'clients')
