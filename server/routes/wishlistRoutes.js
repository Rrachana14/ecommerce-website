const express  = require('express');
const {addToWishlist ,removeFromWishlist, getWishlist} = require('../controllers/wishlistController')
const { verifyToken } = require('../middleware/checkMiddleware'); 
const router = express.Router();

router.post('/addToWishlist',verifyToken,addToWishlist);
router.post('/removeFromWishlist',verifyToken,removeFromWishlist);
router.get('/getWishlist',verifyToken,getWishlist);

module.exports = router;