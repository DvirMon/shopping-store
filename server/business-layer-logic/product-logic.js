const Product = require("../models/product-model");
const Category = require("../models/category-model");

// get all products
const getAllProductsAsync = async () => {
  return await Product.find({}).exec();
};

// search function - get products by query
const searchProductsAsync = async (query) => {
  return await Product.find({ name: { $regex: query, $options: "i" } }).exec();
};

// get total amount of products docs
const getTotalDocsAsync = async () => {
  return Product.estimatedDocumentCount();
};

// get products by category
const getAllProductsByCategoryAsync = async (categoryId) => {
  return await Product.find({ categoryId })
    .exec();
};

const addProductAsync = async (product) => {
  return product.save();
};

const updateProductAsync = async (product) => {
  const info = await Product.updateOne({ _id: product._id }, product).exec();
  return info.n ? product : null;
};

const getAllCategories = async () => {
  return await Category.find({}).exec();
};

module.exports = {
  getAllProductsAsync,
  getTotalDocsAsync,
  searchProductsAsync,
  getAllProductsByCategoryAsync,
  addProductAsync,
  updateProductAsync,
  getAllCategories,
};
