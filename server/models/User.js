const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Types.ObjectId;


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String
    },
    address: {
        city:String,
        state:String,
    },
    phoneNumber: {
        type: String
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpires: {
        type: Date,
        default: null,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Wishlist items
    cart: [{ 
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
        quantity: { type: Number, default: 1 },
        size: { type: String }

    }], 
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    console.log("Hashing password:", this.password);
    this.password = await bcrypt.hash(this.password, 10);
    console.log("Hashed password:", this.password);
    next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;
