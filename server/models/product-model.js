const mongoose = require("mongoose");
const Category = require("./category-model");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true, minlemgth: [4], maxlength: [35] },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: Category,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: [/^[1-9]+[0-9]*$/, "price can`t be negative or equal to 0"],
    },
    imagePath: { type: String, required: true },
  },
  { versionKey: false, autoIndex: false }
);


module.exports = mongoose.model("Product", ProductSchema, "products");
