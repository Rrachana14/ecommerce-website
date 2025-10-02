import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Wishlist = () => {
  const { auth } = useAuth();
  const [allproducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  

  const navi = (product) => {
    console.log("hh");

    console.log(product._id);
    navigate(`/products/productDetailPage/${product._id}`);
  };

  useEffect(() => {
    if (!auth.token) return;

    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get("/wishlist/getWishlist", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const wishlistItems = response.data.wishlist;
        console.log(wishlistItems);

        console.log("calling get products")

        const productRequests = wishlistItems.map((id) =>
          axiosInstance.get(`/getProduct/${id}`)
        );
        const productResponses = await Promise.all(productRequests);

        // Extract product data from responses
        const prods = productResponses.map((res) => res.data.product);
        console.log("products received ",prods)
        setAllProducts(prods);
        console.log(allproducts)

      } catch (error) {
        console.error("Error fetching wishlist product:", error);
      }
    };

    fetchWishlist();
  }, [auth.token]);
  
  return (
    <div className="w-full h-screen">
      <Nav />
      <div className="w-full h-screen flex ">
        <ProductFilter />
        <div className=" px-12 py-3">
          <div className="w-full h-16 ">
            <SearchBar />
          </div>
          <div className="my-8 flex gap-3 flex-wrap">
            {allproducts.length > 0 ? (
              allproducts.map((product, index) => (
                <ProductCard
                //   onClick={() => navi(product)}
                  key={index}
                  product={product}
                />
              ))
            ) : (
              <p>No products available in this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
