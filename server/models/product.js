const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    imagePath: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports =  mongoose.model('Product', ProductSchema, 'products')
 