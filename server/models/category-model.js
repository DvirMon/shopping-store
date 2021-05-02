const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required  :true
    },
    alias: {
      type: String,
      required  :true
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Category", CategorySchema, "categories");
