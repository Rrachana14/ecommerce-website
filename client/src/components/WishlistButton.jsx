import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const WishlistButton = ({
  productId,
  className = "",        // custom outer div styling
  iconClass = "",         // custom icon styling
  popupPosition = "center", // optional: can add "top-right" etc.
}) => {
  const { auth } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) return;

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

  const handleWishlistToggle = async () => {
    if (!auth.token) {
      setShowPopup(true);
      return;
    }
    console.log("click")

    setLoading(true);
    try {
      const url = isFavorite ? "/wishlist/removeFromWishlist" : "/wishlist/addToWishlist";
      await axiosInstance.post(
        url,
        { productId },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setIsFavorite((prevState) => !prevState);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        onClick={handleWishlistToggle}
        className={`cursor-pointer  ${className}`}
        title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <i
          className={`ri-heart-${isFavorite ? "fill" : "line"} ${isFavorite ? "text-red-500 " : "text-gray-600"} ${loading ? "opacity-50" : ""} ${iconClass}`}
        />
      </div>

      {/* Login Required Modal */}
      <Dialog
        open={showPopup}
        onClose={() => setShowPopup(false)}
        className="fixed inset-0 flex items-center justify-center z-50 bg-zinc-900 bg-opacity-40 "
      >
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-[500px] text-center h-fit">
          <h2 className="text-lg font-semibold">Login Required</h2>
          <p className="text-gray-600 mt-2">Please sign in to add items to your wishlist.</p>
          <div className="mt-4 flex justify-center space-x-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Login
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default WishlistButton;
