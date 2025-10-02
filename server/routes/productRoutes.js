const express = require('express');
const router = express.Router();
// const Product= require('../models/Product');
const { addProduct, productDetails ,productByCategory,getAllProducts, getProductsByIds} = require('../controllers/productController');

// Route to add a product
router.post('/products', addProduct);

//Route to fetch the products.
router.get('/products/:category',productByCategory);

// ROUTE TO GET THE DETAILS OF THE PRODUCTS.
router.get('/products/productDetailPage/:productId', productDetails);

// GET ALL THE PRODUCTS
router.get('/getAllProducts', getAllProducts);

// GET ALL THE PRODUCTS FROM IDS
router.get('/products/items/incart', getProductsByIds);




module.exports = router;
