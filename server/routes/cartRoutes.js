const express = require('express');
const { addToCart ,getCart, updateCartItemQuantity, removeItemFromCart} = require('../controllers/addToCartController'); 
const { verifyToken } = require('../middleware/checkMiddleware'); 
const router = express.Router();

// Debugging Logs
// console.log("verifyToken Function (before usage):", verifyToken);
router.post('/add', verifyToken, addToCart);
router.get('/getCart', verifyToken, getCart);
router.put('/items/:cartid', verifyToken, updateCartItemQuantity);
router.delete('/removeItemFromCart/:cartid',verifyToken,removeItemFromCart);



module.exports = router;
