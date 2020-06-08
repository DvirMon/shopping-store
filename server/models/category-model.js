const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: { type: String },
    alias: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Category", CategorySchema, "categories");
