const User = require("../models/user-model");


const getUserAsync = async (email) => {
  return await User.findOne({ email : email }).exec();
};

const addUserAsync = async (User) => {
  const user = await User.save();
  user.password = undefined;
  return user
};

const validUniquePersonalIdAsync = async (personalId) => {
  return await User.countDocuments({ personalId }).exec();
}

const validUniqueEmailAsync = async (email) => {
  return await User.countDocuments({ email }).exec();
}

module.exports = {
  getUserAsync,
  addUserAsync,
  validUniquePersonalIdAsync,
  validUniqueEmailAsync
};
