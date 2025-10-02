const express = require('express');
const { addOrders , getMyOrders} = require("../controllers/orderController");
const { verifyToken } = require('../middleware/checkMiddleware'); 

const router = express.Router();

router.post('/add-order',verifyToken,  addOrders);
router.get("/my-orders",verifyToken, getMyOrders);
module.exports = router;
