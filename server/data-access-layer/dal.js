const mongoose = require("mongoose");
global.config = require('../config.json')


const connectAsync = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      config.mongodb.url,
      config.mongodb.options,
      (err, mongo) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(mongo);
      }
    );
  });
};

const connectToDatabase = async () => {
  try {
    const db = await connectAsync();
    console.log("We are connect to " + db.name + " on MongoDB database");
  } catch (err) {
    console.log(err);
  }
};

connectToDatabase();
