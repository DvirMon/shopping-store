const Product = require("../models/product-model");
const Category = require("../models/category-model");

// get all products sort by category
const getAllProductsAsync = async () => {
  return await Product.find({}).exec();
};

const getProductAsync = async (_id) => {
  return await Product.findOne({ _id }).exec();
};

// search function - get products by query
const searchProductsAsync = async (query) => {
  return await Product.find({ name: { $regex: query, $options: "i" } })
    .limit(10)
    .exec();
};

// get total amount of products docs
const getTotalDocsAsync = async () => {
  return Product.estimatedDocumentCount();
};

// get products by category
const getAllProductsByCategoryAsync = async (categoryId) => {
  return await Product.find({ categoryId }).exec();
};

const getProductsPaginationAsync = async (query, options) => {
  return await Product.paginate(query, options, (err, result) => {
    if (err) {
      return next(err);
    }
    return result;
  });
};

// add product
const addProductAsync = async (product) => {
  return product.save();
};

// update product
const updateProductAsync = async (product) => {
  const info = await Product.updateOne({ _id: product._id }, product).exec();
  return info.n ? product : null;
};

const getAllCategories = async () => {
  return await Category.find({}).exec();
};

const getCategoryAsync = async (_id) => {
  return await Category.findById({ _id }).exec();
};

module.exports = {
  getAllProductsAsync,
  getProductAsync,
  getTotalDocsAsync,
  searchProductsAsync,
  getAllProductsByCategoryAsync,
  getProductsPaginationAsync,
  addProductAsync,
  updateProductAsync,
  getAllCategories,
  getCategoryAsync,
};
