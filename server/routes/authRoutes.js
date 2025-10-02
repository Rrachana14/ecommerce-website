const express = require('express');
const {registerUser,loginUser, googleLogin, sendOtpForForgetPassword,resetPassword } = require('../controllers/authController')
const router = express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser)
router.post('/google-login', googleLogin);
router.post('/send-otp', sendOtpForForgetPassword);
router.post('/verify-otp-reset-password', resetPassword);

module.exports = router;




