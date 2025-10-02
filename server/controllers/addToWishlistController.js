// const User = require('../models/User'); // Fix import
// const Product = require('../models/Product'); // Fix import


// exports.addToWishlist = async (req, res) => {
//     try {
//         const { productId, quantity } = req.body;
//         const userId = req.user.id;  // Extract user ID from the token

//         if (!productId || !quantity) {
//             return res.status(400).json({ message: "Missing product details" });
//         }

//         // Check if product exists
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Find user
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Check if the product is already in the cart
//         const existingItemIndex = user.wishlist.findIndex(item => item.product.toString() === productId);

//         if (existingItemIndex !== -1) {
//             user.cart[existingItemIndex].quantity += quantity;
//         } else {
//             user.cart.push({ product: productId, quantity });
//         }

//         await user.save();
//         res.status(200).json({ success: true, message: "Product added to cart!", cart: user.cart });
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         res.status(500).json({ success: false, message: "Failed to add item to cart" });
//     }
// };

