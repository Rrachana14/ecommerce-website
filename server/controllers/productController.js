const mongoose = require('mongoose');
const Product = require('../models/Product');
const { findById } = require('../models/User');

// ADD PRODUCTS 
exports.addProduct = async (req,res)=>{
    try{
      const {
        name,
        description,
        price,
        category,
        size,
        color,
        brand,
        stock,
        images,
        materialComposition,
        weaveType,
        finishType,
        pattern,
        careInstructions,
        style,
        countryOfOrigin
    } = req.body;

        if (
        !name || !description || !price || !category || !size || !color || 
        !brand || !images || !materialComposition || !weaveType || 
        !finishType || !pattern || !careInstructions || !style || !countryOfOrigin
    ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

        // Create a new product instance
    const newProduct = new Product({
        name,
        description,
        price,
        category,
        size,
        color,
        brand,
        stock: stock || 0, // Set stock to 0 if not provided
        images,
        materialComposition,
        weaveType,
        finishType,
        pattern,
        careInstructions,
        style,
        countryOfOrigin
    });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully.', product: newProduct });
    }catch(error){
        console.error('error message ',error);
        return res.status(500).json({message:"Server error"})
    }
}


// RETURN PRODUCT DETAILS
exports.productDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId)

      // Check if productId is a valid ObjectID
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid Product ID' });
      }

    // Validate Product ID
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Fetch the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return product details
    res.status(200).json({ product });
  } catch (err) {
    console.error('Error while fetching the product details:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.productByCategory = async(req,res)=>{
    const {category } = req.params;
    console.log('Category ',category);
    try{

        if (!category) {
            return res.status(400).json({ message: 'Category is required' });
          }

        // USING FIND TO FETCH ALL THE PRODUCTS OF GIVEN CATEGORY.
        const products = await Product.find({category});
        if(products.length == 0){
            return res.status(404).json({message: `No product available of ${category}`});
        }

        // RETURN ALL PRODUCTS
        res.json({category:products});
    }catch(err){
        console.error("Error fetching the category related products ",err);
        return res.status(500).json({ message: 'An error occurred', err });   
    }
}

  
// get all the products
exports.getAllProducts = async(req, res) =>{
  console.log("getProduct controller",id)
    try{
      const products = await Product.find();

      if (!products) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ products });
    }catch(error){
      console.log("error fetching products is",error);
      res.status(500).json({ message: "Server error" });
    }
}

// products/incart/ids.
exports.getProductsByIds = async (req, res) => {
  try {
    const idsParam = req.query.ids; // ✅ use query
    
    if (!idsParam) {
      return res.status(400).json({ message: 'Product IDs are required' });
    }
    console.log("Product IDs received:", idsParam);
    console.log("ids ",idsParam)
    const idsArray = idsParam.split(',');
    const validIds = idsArray.filter(id => mongoose.Types.ObjectId.isValid(id));

    const products = await Product.find({ _id: { $in: validIds } });
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by IDs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

