import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import AdminDashboard from "./admin/AdminDashboard";
import CategoryWiseProducts from "./pages/CategoryWiseProducts";
import ProductDetailPage from "./pages/productDetailPage";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import Delivery from "./pages/DeliveryPage";
import PaymentPage from "./pages/PaymentPage";
import MyOrdersPage from "./pages/MyOrdersPage"
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/products/:category" element={<CategoryWiseProducts />} />
          <Route path="/wishlistPage" element={<Wishlist />} />
          <Route path="/cartPage" element={<Cart/>} />
          <Route path="/DeliveryPage" element={<Delivery />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<MyOrdersPage/>} />
          <Route
            path="/products/ProductDetailPage/:productId"
            element={<ProductDetailPage />}
          ></Route>
        </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
