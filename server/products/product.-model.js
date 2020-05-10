const mongoose = require("mongoose");
const Category = require('../categories/category-model')

const ProductSchema = mongoose.Schema(
  {
    name: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: Category },
    price: { type: Number },
    imagePath: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Product", ProductSchema, "products");
