const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'western',
      'ethnic',
      'accessories',
    ],
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  images: {
    type: [String],
    required: true,
  },
  ratings: {
    type: Number,
    min: 1
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    images: { type: [String] }, // Array to store URLs of review images
    date: { type: Date, default: Date.now },
  }],
  materialComposition: {
    type: String,
    required: true,
  },
  weaveType: {
    type: String,
    required: true,
  },
  finishType: {
    type: String,
    required: true,
  },
  pattern: {
    type: String,
    required: true,
  },
  careInstructions: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  countryOfOrigin: {
    type: String
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
