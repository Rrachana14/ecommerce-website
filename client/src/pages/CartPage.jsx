import React, { useEffect, useState } from "react";
import CartItems from "../components/Cart/CartItems";
import Nav from "../components/Nav";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();

  const handleRemoveItem = async (cartid) => {
    try {
      const success = await removeFromCart(cartid);
      if (success) {
        setModalMessage("Item removed from cart!");
        setModalType("success");
        setShowModal(true);
      } else {
        setModalMessage("Failed to remove item from cart.");
        setModalType("error");
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage("Error removing item.");
      setModalType("error");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const handleUpdate = (productId, newQuantity, size) => {
    updateCartItemQuantity(productId, newQuantity, size);
  };

  return (
    <div className="w-full bg-gray-50 ">
      <Nav />
      {showModal && (
        <Modal message={modalMessage} onClose={closeModal} type={modalType} />
      )}
      <div className="max-w-7xl h-fit mx-auto px-6  " >

        <div className="flex flex-col lg:flex-row gap-8 mt-3  ">
          {/* Cart Items Section */}
          {auth?.token || auth?.user ? (
            <div className="flex-1 relative">
              {cartItems.length > 0 ? (
                <>
                  <div className="h-auto">
                    <CartItems
                      cart={cartItems}
                      onRemoveItem={handleRemoveItem}
                      onUpdateQuantity={handleUpdate}
                      setTotalPrice={setTotalPrice}
                    />
                  </div>
                  {/* Order Summary & Proceed Button */}
                  <div className="w-full lg:w-1/3 bg-white rounded-xl  p-6 mt-8 h-fit absolute right-0">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="flex justify-between mb-2 ">
                      <span>Total Items:</span>
                      <span>{cartItems.length}</span>
                    </div>
                    <div className="flex justify-between mb-4 h-fit">
                      <span>Total Price:</span>
                      <span className="font-bold text-green-600 ">
                        ₹{totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate("/deliveryPage")}
                      className="w-full py-2 mt-2 bg-green-600 hover:bg-green-700 text-white rounded-sm font-semibold h-10"
                    >
                      Proceed to Delivery
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-gray-500 text-lg">Your cart is empty.</div>
              )}
            </div>
          ) : (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
              <h3 className="uppercase font-bold text-xl font-mono h-fit mb-4">Please Log in</h3>
              <h5 className="text-gray-500 h-fit">Login to view Items in Your Cart</h5>
              <img src="images/cart_list.svg" alt="cart_list image"  className="h-36 w-36 "/>
              <button onClick={() => navigate("/login")} className=" border-2 border-[#3466e8] hover:border-[#3466e8] text-[#3466e8] font-semibold hover:font-bold uppercase h-fit w-fit px-10 py-2 rounded-md mt-5">Login</button>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
