import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddProduct from "./AddProduct";
// import CustomerAnalytics from "./CustomerAnalytics"; // Uncomment if needed

const AdminDashboard = () => {
  const { auth } = useAuth(); // Get authentication context
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Only proceed with rendering if the user is authenticated and is an admin
  if (!auth.token || !auth.user?.isAdmin) {
    return <Navigate to="/" />; // Redirect to home page if not authenticated or not an admin
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <h1>Welcome to the dashboard</h1>;
      case "Products":
        return <AddProduct />;
      case "Customers":
        return <CustomerAnalytics />;
      case "Orders":
        return <div>Order History</div>;
      case "Settings":
        return <div>Adjust your Settings</div>;
      case "Logout":
        localStorage.removeItem("authToken");
        return <Navigate to="/" />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-60 bg-gray-800 text-white h-screen flex flex-col">
        <div className="p-4 text-4xl font-bold">Wb0</div>
        <ul className="flex flex-col gap-4 mt-6">
          {["Dashboard", "Products", "Customers", "Orders", "Settings", "Logout"].map((tab) => (
            <li
              key={tab}
              className={`hover:bg-gray-700 p-3 cursor-pointer ${activeTab === tab ? "bg-gray-700" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 h-screen bg-yellow-100">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
