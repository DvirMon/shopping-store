const Product = require("../models/product-model");
const Category = require("../models/category-model");

// get products with ids array
const getProductWithIdsAsync = async (ids) => {
  return await Product.find().where("_id").in(ids).exec();
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

// get products with pagination
const getProductsPaginationAsync = async (query, options) => {
  return await Product.paginate(query, options, (err, result) => {
    if (err) {
      throw new Error(err);
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
  getProductWithIdsAsync,
  getTotalDocsAsync,
  searchProductsAsync,
  getProductsPaginationAsync,
  addProductAsync,
  updateProductAsync,
  getAllCategories,
  getCategoryAsync,
};
