import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import useAllProducts from "../hook/useAllProducts";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { auth } = useAuth();
  const { products, loading: loadingProducts } = useAllProducts();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please login to view your orders");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
        console.log(orders)
      } catch (error) {
        console.error(error);
        alert("Failed to fetch orders");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loadingOrders || loadingProducts)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Order ID: {order._id}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.orderStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.orderStatus === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="mb-4 text-gray-600">
                <p>
                  <span className="font-medium">Total:</span> ₹{order.totalPrice}
                </p>
                <p>
                  <span className="font-medium">Payment Method:</span> {order.paymentMethod}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-4">Items:</h4>
                <ul className="space-y-4">
                  {order.items.map((item, idx) => {
                    const productData = products.find(
                      (p) => p._id === item.product._id
                    );
                    return (
                      <li
                        key={idx}
                        className="flex items-center border rounded-md p-3 bg-gray-50 hover:bg-gray-100 transition"
                      >
                        {productData?.image && (
                          <img
                            src={productData.image}
                            alt={productData.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {productData?.name || "Product Name"}
                          </p>
                          <p className="text-gray-600">
                            Qty: {item.quantity} | Price: ₹{item.price}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
