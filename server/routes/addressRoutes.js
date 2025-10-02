const express = require('express');
const { getAddress, addAddress, deleteAddress } = require('../controllers/addressController');
const { verifyToken } = require('../middleware/checkMiddleware'); 


const router = express.Router();
console.log("calling get address")
router.get('/getAddress',verifyToken, getAddress);
router.post('/addAddress',verifyToken,addAddress);
router.delete('/deleteAddress/:id', verifyToken , deleteAddress);

module.exports = router; 
