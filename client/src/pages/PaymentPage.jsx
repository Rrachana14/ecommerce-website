import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Nav from "../components/Nav";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const addressId = location.state?.addressId;
  const [totalPrice, setTotalPrice] = useState();

   useEffect(() => {
    if (!auth?.token) {
      navigate("/login");
    }
  }, [auth, navigate]);

  console.log("Cart items",cartItems)
  const handlePlaceOrder = async () => {
    if (!addressId) {
      alert("Delivery address is missing.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    try {
      const orderData = {
        userid: auth.user.id, 
        shippingAddress: addressId,
        items: cartItems.map((item) => ({
          product: item.product_id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        paymentMethod: "COD", 
        totalPrice: totalPrice,
  
      };
      

      // console.log(cartItems[0].items[0].product);

      
      console.log(orderData);


      // Send order to backend
      const response = await axiosInstance.post("/add-order", orderData, {
        headers: {
      Authorization: `Bearer ${auth.token}` // Must exist!
    },
      });

      if (response.status === 201) {
        alert("Order placed successfully!");
        localStorage.removeItem("cartItems"); // clear cart after order
        navigate("/order-success");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div>
       <Nav/>
   
    <div className="max-w-3xl mx-auto p-6">
     
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>

      <div className="border p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Selected Address</h3>
        <p>Address ID: {addressId}</p>
      </div>

      <div className="border p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <p>Items Total: ₹1000</p>
        <p>Shipping: ₹50</p>
        <p className="font-bold">99</p>
      </div>

      <div className="border p-4 rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <label className="block mb-2">
          <input type="radio" name="payment" defaultChecked /> Cash on Delivery
        </label>
        <label className="block mb-2">
          <input type="radio" name="payment" disabled /> Card (Coming Soon)
        </label>
        <label className="block mb-2">
          <input type="radio" name="payment" disabled /> UPI (Coming Soon)
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
     </div>
  );
};

export default PaymentPage;
