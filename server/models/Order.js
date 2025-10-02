const mongoose = require("mongoose");
const User = require("../models/User")
const Product = require("../models/Product")


const orderSchema = new mongoose.Schema({
  shippingAddress: {
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required: true,

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // price at the time of order
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
