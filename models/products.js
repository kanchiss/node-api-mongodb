const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  details: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Product', productSchema);
