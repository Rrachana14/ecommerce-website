import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const useCategoryProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);

      try {
        console.log("The current category is", category);
        const response = await axiosInstance.get(`/products/${category}`);
        console.log(response.data);
        setProducts(response.data.category); 
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err);
      } 
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  return { products,  error };
};

export default useCategoryProducts;
