const mongoose = require("mongoose");
const config = require("../config");

const URI = `mongodb+srv://${process.env.MONGO_USER}:mongo3000@shopping-store-yfdwj.mongodb.net/Grocery`

const connectAsync = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      config.mongodb.URI,
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
    console.log("We are connect to " + db.connections[0].name + " on MongoDB");
  } catch (err) {
    console.log(err);
  }
};

connectToDatabase();
