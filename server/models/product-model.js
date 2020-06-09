const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Category = require("./category-model");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true, minlemgth: [4], maxlength: [50] },
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
 
ProductSchema.plugin(mongoosePaginate);

const Products = mongoose.model("Product", ProductSchema, "products");

module.exports = Products;
