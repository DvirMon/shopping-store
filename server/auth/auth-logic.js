const Client = require("./client-model");


const getUserAsync = async (email) => {
  const user = await Client.findOne({ email : email }).exec();
  return user
};

const addUserAsync = async (client) => {
  const user = await client.save();
  user.password = undefined;
  return user
};

module.exports = {
  getUserAsync,
  addUserAsync,
};
