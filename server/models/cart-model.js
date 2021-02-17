const mongoose = require("mongoose");
const User = require("./user-model");

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId, ref: User, required: true
    },
    createDate: {
      type: Date, default: Date.now
    },
    isActive: {
      type: Boolean, default: true
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Cart", CartSchema, "carts");
