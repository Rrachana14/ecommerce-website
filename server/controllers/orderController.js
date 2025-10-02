const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { AsyncLocalStorage } = require("async_hooks");
const ObjectId = mongoose.Types.ObjectId;

exports.addOrders = async (req, res) => {
  try {
    const userid = req.user.id;
    const { items, totalPrice, paymentMethod, shippingAddress } = req.body;

    if (!userid || !items || !totalPrice || !paymentMethod || !shippingAddress) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not available" });
    }

    // Check stock for each product
    for (const item of items) {
      const product = await Product.findById(item.product);
      console.log("item ", item.quantity)
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      const availableStock = Number(product.stock);
      console.log("available stock ",availableStock)
      if (availableStock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}. Available: ${availableStock}, Requested: ${item.quantity}`
        });
      }

      // ✅ Reduce stock without triggering schema validation
      await Product.updateOne(
        { _id: item.product },
        { $inc: { stock: -item.quantity } }
      );
    }

    // Create order
    const newOrder = new Order({
      user: userid,
      items,
      totalPrice,
      paymentMethod,
      shippingAddress,
    });

    await newOrder.save();

    // Link order to user
    user.orders.push(newOrder._id);
    user.cart = [];
    await user.save();

  const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
          user: process.env.EMAIL_USERNAME, 
          pass: process.env.EMAIL_PASSWORD, 
        },
      });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "New Order Successfully added !!",
        text : `Order of price ${totalPrice} with the payment option ${paymentMethod} will be shipped at address ${shippingAddress}`
    }  ;

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: "New Order Successfully added!!" });
  } catch (error) {
    console.log("Error while new order", error);
    return res.status(500).json({ message: "Error while adding new order" });
  }
};



exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    if(!userId) return res.status(400).json({missing:"missing id"})

    const orders = await Order.find({ user: userId }).populate("items.product");

    console.log(orders);
   return  res.status(200).json({ orders});


  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Error fetching orders" });
  }
};
