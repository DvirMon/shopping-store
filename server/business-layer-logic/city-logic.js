const City = require('../models/city-model')

const getAllCities = async () => {
  return await City.find().exec()
}

module.exports = {
  getAllCities
}