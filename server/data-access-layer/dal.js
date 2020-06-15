const mongoose = require("mongoose");
global.config = require("../config.json");

const connectAsync = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.ATLAS_URI || config.mongodb.URI,
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
