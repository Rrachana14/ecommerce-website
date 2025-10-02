const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User', 
        required:true,
    },
    type:{
        type:String,
        enum:["Home","Work","Other"],
        default:"Home"
    },
    name:String,
    phone:String,
    addressLine:String,
    city:String,
    state:String,
    pincode:String,
    country:{
        type:String,
        default:"India"
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
},{
    timestamps:true,
});

const Address = mongoose.model('Address',addressSchema);

module.exports = Address;
