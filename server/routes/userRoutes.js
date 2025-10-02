const express = require('express');
const User = require('../models/User');
const { protectedRoute } = require('../middleware/authMiddleware');

const {  getMe,getTopLocations, getMonthlyRegistrations } = require('../controllers/userController');
const router = express.Router();

  router.get('/me',protectedRoute,getMe);
  
  router.get('/top-location',getTopLocations);
  router.get('/monthly-registeration',getMonthlyRegistrations);

module.exports = router;

// not using this