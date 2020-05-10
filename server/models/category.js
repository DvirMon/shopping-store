const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { versionSey: false }
);

module.exports = mongoose.model('Category', CategorySchema, 'categories')