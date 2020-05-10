const mongoose = require("mongoose");
const Client = require("../auth/client-model");

const CartSchema = mongoose.Schema(
  {
    client: { type: mongoose.Types.ObjectId, ref: Client ,required : true},
    createDate: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false }
); 

module.exports = mongoose.model("Cart", CartSchema, "carts");
