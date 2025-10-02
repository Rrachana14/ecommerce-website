import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const useAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosInstance.get("products/getAllProducts");
        setProducts(response.data.products); 
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return { products, loading, error };
};

export default useAllProducts;
