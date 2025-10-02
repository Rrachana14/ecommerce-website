const User = require("../models/User");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addToCart = async (req, res) => {
  try {
    console.log("In the cart controller");
    const { size } = req.body;
    const userId = req.user.id;
    const quantity = parseInt(req.body.quantity, 10);
    const productId = req.body.productId?.toString().trim();

    if (!ObjectId.isValid(productId)) {
      console.log("Invalid productId received",productId);
      return res.status(400).json({ error: "Invalid productId received" });
    }
    if (!productId || !quantity || !size) {
      return res.status(400).json({ message: "Missing product details" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user.cart);

    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId.toString()
    );

    
    if (existingCartItem) {
      console.log("This is existing",existingCartItem," and ",existingCartItem.quantity + quantity ," and product qun is ", product.stock);
      if (existingCartItem.quantity + quantity > product.stock) {
        console.log("return from here")
        return res
          .status(404)
          .json({success:false,
            message: `Only ${product.stock} items available in stock`,
          });
      }

      existingCartItem.quantity = existingCartItem.quantity + quantity;
    } else {
      console.log("coming to this")
      if (quantity > product.stock) {
        return res
          .status(404)
          .json({
            success:false,
            message: `Only ${product.stock} items available in stock`,
          });
      }
      user.cart.push({ product: productId, quantity, size });
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart!",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add item to cart" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // console.log("Fetching cart items")
    if (!user) return res.status(404).json({ message: "User not found" });
    // console.log(user.cart)
    res.status(200).json({ cartItems: user.cart });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
};

// UPDATED CART ITEM QUANTITY
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const cartid = req.params.cartid;
    const { quantity } = req.body;
    console.log("product id", cartid);

    if (!cartid || !quantity) {
      return res.status(400).json({ message: "Missing product details" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the index of the cart item with matching product and size
    const itemIndex = user.cart.findIndex((item) => {
      return item._id.toString() === cartid;
    });

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the quantity
    user.cart[itemIndex].quantity = quantity;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Quantity updated", cart: user.cart });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update quantity",error });
  }
};

// REMOVE ITEM FROM THE CART
exports.removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartId = req.params.cartid;

    if (!cartId) {
      return res.status(400).json({ message: "Missing cart item ID" });
    }

    const user = await User.findById(userId);
    const itemIndex = user.cart.findIndex(
      (item) => item._id.toString() == cartId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    user.cart.splice(itemIndex, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: user.cart,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
