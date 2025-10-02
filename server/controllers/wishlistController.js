const User = require('../models/User');
const Product = require('../models/Product'); 

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        console.log(productId);
        const userId = req.user.id;
        console.log("in the wishlist controller")
        if (!productId) return res.status(400).json({ message: 'Product ID is required' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        user.wishlist.push(productId);
        await user.save();
        res.status(200).json({ message: 'Added to wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        await user.save();

        res.status(200).json({ message: 'Removed from wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        console.log("in the wishlist controller")
        if (!user) return res.status(404).json({ message: 'User not found' });
        // console.log("in the wishlist controller",user)
        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        console.log("error",error.message)
        res.status(500).json({ message: error.message });
    }
};