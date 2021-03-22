const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    category: {
        type: String,
        required: true,
      },
      colors: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      featured: {
        type: String,
        required: true
      },
      images: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      reviews: {
        type: String,
        required: true
      },
      shipping: {
        type: String,
        required: true
      },
      stars: {
        type: String,
        required: true
      },
      stock: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('Product', postSchema)