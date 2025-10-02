const User = require("../models/User");
const Address = require("../models/Address");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getAddress = async(req,res)=>{
    try{
        console.log("in the address controller")
        const userId = req.user.id;
        const user = await User.findById(userId);

        if(!user) {
            // console.log("user not found");
            return res.status(404).json({message:"User not found"});
        }

        const addresses = await Address.find({ user: userId });
   
        return res.status(200).json({addresses});
        

    }catch(err){
        console.log("Error fetching the address ", err.message);
        return res.status(500).json({message:err.message});
    }
};


exports.addAddress = async (req,res) =>{
    try{
        const { type, name, phone, addressLine , city, state, pincode, country } = req.body;

        if (!type || !name || !phone || !addressLine  || !city || !state || !pincode || !country) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({message : "User not found"});

        const newAddress = new Address({
            user,
            name,
            phone,
            type,
            addressLine , 
            city,
            state,
            pincode,
            country
        });

        await newAddress.save();
        
        return res.status(200).json({message:"New Address successfully added !",address:newAddress});



    }catch(err){
        // console.log("Error while adding the address ", err.message);
        return res.status(500).json({message:err.message});
    }
}


exports.deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;

    // Find the address
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Check if the address belongs to the logged-in user
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this address" });
    }

    await Address.findByIdAndDelete(addressId);

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    // console.error("Error deleting address:", err.message);
    res.status(500).json({ message: err.message });
  }
};