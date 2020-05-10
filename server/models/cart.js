const mongoose = require("mongoose");
const Client = require("./client");

const CartSchema = mongoose.Schema(
  {
    client: { type: mongoose.Types.ObjectId, ref: Client, required: true },
    createDate: { type: Date, required: true },
  },
  { versionKey: false }
);

module.exports =  mongoose.model('Cart', CartSchema, 'carts')
