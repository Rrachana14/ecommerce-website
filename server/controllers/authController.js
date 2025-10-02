const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { AsyncLocalStorage } = require("async_hooks");
const disposableEmailList = require("disposable-email-domains");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      isAdmin,
      profileImage,
      address,
      phoneNumber,
    } = req.body;

    const emailDomain = email.split("@")[1];
    if (disposableEmailList.includes(emailDomain)) {
      return res
        .status(400)
        .json({ message: "Disposable emails are not allowed." });
    } 

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
      isAdmin: isAdmin || false,
      profileImage: profileImage || "",
      address: address || "",
      phoneNumber: phoneNumber || "",
    });

    await newUser.save();

    return res.status(201).json({ message: "User successfully registered" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for email and password in request
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found." });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// GOOGLE LOGIN
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email,
        profileImage: picture,
        password: "", // not used
        isAdmin: false,
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    return res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Google login failed:", error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

// SEND OTP FOR THE FORGET PASSWORD
exports.sendOtpForForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not found." });
    }
   const otp = crypto.randomInt(100000, 1000000).toString();

    const otpExpires = new Date(Date.now() + 3 * 60 * 1000); // otp expires after three mins

    user.otp = otp;
    user.otpExpires = otpExpires;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.log("Error while sending the otp", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// CONTROLLER TO VERIFY THE OTP
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    console.log(email, otp, newPassword);
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist." });
    }

    // Check if OTP matches and is not expired (assuming you saved OTP and expiration in user model)
    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (user.resetOtpExpiration < Date.now()) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    // Update user's password and remove/reset OTP fields
    user.password = newPassword;
    user.resetOtp = null;
    user.resetOtpExpiration = null;

    await user.save();

    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
