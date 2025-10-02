import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { auth } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    if (!auth?.token) return;

    try {
      const response = await axiosInstance.get("/cart/getCart", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const cartData = response.data.cartItems || [];

      if (!Array.isArray(cartData)) {
        throw new Error("Cart data is not an array");
      }

      if (cartData.length === 0) {
        setCartItems([]);
        setError(null);
        return;
      }

      const productIds = [...new Set(cartData.map((item) => item.product))];

      const productsResponse = await axiosInstance.get(
        `/products/items/incart?ids=${encodeURIComponent(productIds.join(","))}`
      );

      const productsData = productsResponse.data || [];

      const enrichedCartItems = cartData.map((item) => {
        const productDetail = productsData.find(
          (prod) => prod._id === item.product
        );
        return {
          id: item._id || item,
          product_id: item.product,
          quantity: item.quantity,
          size: item.size,
          product: productDetail,
        };
      });

      setCartItems(enrichedCartItems);
      setError(null);
    } catch (err) {
      console.error("Error fetching cart or products:", err);
      setError(err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [auth?.token]);

  const isInCart = (productId, size) => {
    return cartItems.some(
      (item) => item.product_id === productId && item.size === size
    );
  };

  const addToCart = async (productId, quantity = 1, size) => {
    if (!auth?.token) {
      setShowPopup(true);
      return false;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/cart/add",
        {
          productId,
          quantity,
          size,
          userId: auth.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchCart();
        setError(null);
        setLoading(false);
        // alert("Added to cart!");
        return true;
      } else {
         const msg = response.data.message || "Out of Stock.";
         
        alert("Out of Stock"); 
        (false);
        return false;
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert(`${err.response.data.message } and you have already added !`);
      setLoading(false);
      setError(err);
      return false;
    }
  };

  const removeFromCart = async (cartid) => {
    if (!auth?.token) {
      setShowPopup(true);
      return false;
    }

    setLoading(true);
    try {
      await axiosInstance.delete(`/cart/removeItemFromCart/${cartid}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      await fetchCart();
      setError(null);
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError(err);
      setLoading(false);
      return false;
    }
  };

  const updateCartItemQuantity = async (cartid, quantity) => {
    try {
      await axiosInstance.put(
        `/cart/items/${cartid}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      await fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err);
    }
  };

  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        showPopup,
        setShowPopup,
        isInCart,
        addToCart,
        removeFromCart,
        fetchCart,
        updateCartItemQuantity,
        totalItems, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
