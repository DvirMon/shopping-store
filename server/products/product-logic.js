const Product = require("./product.-model");

const getAllProductsAsync = async () => {
  return await Product.find({}).exec();
};

const getAllProductsByCategoryAsync = async (category) => {
  return await Product.find({ category : category }).exec();
};

const addProductAsync = async (product) => {
  return product.save();
}; 

module.exports = {
  getAllProductsAsync,
  getAllProductsByCategoryAsync,
  addProductAsync
}
