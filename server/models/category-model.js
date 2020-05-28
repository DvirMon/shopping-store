const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: { type: String },
    alias: { type: String },
  },
  { versionSey: false }
);

module.exports = mongoose.model("Category", CategorySchema, "categories");
