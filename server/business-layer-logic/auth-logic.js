const User = require("../models/user-model");

const findUser = async (email) => {
  return await User.findOne({ email }).exec();
};

const addUserAsync = async (payload) => {
  const user = await User.create(payload);
  user.password = undefined;
  return user;
};

const validUniquePersonalIdAsync = async (personalId) => {
  return await User.countDocuments({ personalId }).exec();
};

const validUniqueEmailAsync = async (email) => {
  return await User.countDocuments({ email }).exec();
};

const isUserExist = async (_id) => {
  return await User.find({ _id }, { _id: 1 }).exec();
};

module.exports = {
  findUser,
  addUserAsync,
  validUniquePersonalIdAsync,
  validUniqueEmailAsync,
  isUserExist,
};
