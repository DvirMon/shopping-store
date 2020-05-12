const mongoose = require("mongoose");

const CitySchema = mongoose.Schema(
  {
    name: { type: String }
  },
  { versionSey: false }
);

module.exports =  mongoose.model('City', CitySchema, 'cities')