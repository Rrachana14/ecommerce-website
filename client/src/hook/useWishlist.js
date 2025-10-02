
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // Adjust the path as needed
import { useAuth } from "../context/AuthContext";

const useWishlist = (productId,onclick) => {
  const { auth } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
    
  useEffect(() => {
    if (!auth.token || !productId) return;

    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get("/wishlist/getWishlist", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const wishlistItems = response.data.wishlist;
        setIsFavorite(wishlistItems.includes(productId));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [auth.token, productId]);

  const toggleWishlist = async () => {
    if (!auth.token) {
      setShowPopup(true);
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await axiosInstance.post(
          "/wishlist/removeFromWishlist",
          { productId },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
      } else {
        await axiosInstance.post(
          "/wishlist/addToWishlist",
          { productId },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
      }
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
    setLoading(false);
  };

  return { isFavorite, loading, showPopup, toggleWishlist };
};

export default useWishlist;
