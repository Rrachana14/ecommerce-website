import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import axios from "axios";

const Nav = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [showUser, setShowUser] = useState(false);
  const [visible, setVisible] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Retrieved token:", token);
        if (!token) {
          console.log("in the if ");
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API response:", response.data); // Log the API response
        setUser(response.data.username);
      } catch (err) {
        console.error(
          "Error fetching user:",
          err.response ? err.response.data : err.message
        ); // Logs server-side error or Axios error
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    let timer;
    if (showUser) {
      timer = setTimeout(() => {
        setShowUser(false);
      }, 5000); 
    }

    return () => clearTimeout(timer); 
  }, [showUser]);

  const showPanel = () => {
    console.log(showUser);
    setShowUser((prevState) => !prevState);
  };

  const handleLogout = async () => {
    console.log("called loggedout");
    setUser(null);
    setShowUser(null);
    logout();
  };

 return (
  <div id="nav" className="w-full bg-black text-white py-4 sticky top-0 z-50 shadow-md">
    <div className="max-w-screen mx-10 flex items-center justify-between px-4 md:px-8 ">
      {/* Logo */}
      <h4 className="font-bold tracking-wider text-2xl">Wb0</h4>      

      {/* Nav Links (Desktop Only) */}
      <ul className="hidden md:flex gap-10 font-mono text-lg">
        {["Western", "Ethnic", "Accessories", "Gifts"].map((item, idx) => ( 
          <li
            key={idx}
            className="hover:text-blue-300 uppercase hover:scale-110 hover:rotate-2 transition duration-300 px-2 py-1 rounded-md"
          >
            <a href={`/products/${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {/* Icons */}
        <ul className="flex text-md items-center gap-4">
          <li className="text-white text-xl cursor-pointer hover:text-[#c1121f] transition duration-300">
            <i className="ri-heart-fill"></i>
          </li>
          <li className="text-white text-xl cursor-pointer hover:text-[#6a994e] transition duration-300">
            <div className="flex relative">
              <a href="/cartPage">
                <i className="ri-shopping-cart-fill"></i>
              </a>
              <div className="absolute -z-30 -top-3 left-4 bg-[#b5e48c] rounded-full px-[8px] py-[4px] text-xs text-black font-extrabold flex items-center justify-center">
                {totalItems}
              </div>
            </div>
          </li>
          <li className="relative text-white text-xl cursor-pointer hover:text-yellow-400 transition duration-300">
            <i className="ri-user-fill" onClick={showPanel}></i>
            
              {showUser && user && (
                <div className="absolute top-10 -right-20 min-w-80 min-h-[110px] capitalize">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 px-8 py-4 mb-7 to-pink-500 font-semibold text-white text-lg h-full shadow-sm rounded-md opacity-1 transform translate-y-[-100px] animate-slideDownEnhanced">
                  Hello, {user} 👋
                  <br />
                  <button
                    onClick={handleLogout}
                    className="bg-white text-black h-fit w-[45%] mr-5 px-3 py-2 my-2 rounded-md text-sm hover:font-bold"
                  >
                    Logout
                  </button>
                  <button className="bg-white text-black h-fit w-[45%] px-3 py-2 my-2 rounded-md text-sm hover:font-bold">
                    View Profile
                  </button>
                </div>
                </div>
              )}
              {showUser && !user && (
                <div className="absolute top-10 -right-20 min-w-80 min-h-[110px] capitalize">
                <div className="flex h-fit bg-white p-4 rounded-xl shadow-lg items-center justify-center space-x-4 border border-gray-200 opacity-1 transform translate-y-[-100px] animate-slideDownEnhanced">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    Sign Up
                  </button>
                </div>
            </div>
              )}
          </li>
        </ul>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden">
          <button onClick={() => setVisible((prev) => !prev)}>
            <i className="ri-menu-3-fill text-2xl text-white"></i>
          </button>
        </div>
 
      </div>

    </div>

    {/* Mobile Nav Dropdown */}
    {visible && (
      <ul className="md:hidden flex flex-col gap-4 bg-black text-white text-lg px-6 py-4 font-mono">
        {["Western", "Ethnics", "Accessories", "Gifts"].map((item, idx) => (
          <li
            key={idx}
            className="hover:text-pink-300 uppercase hover:scale-105 hover:rotate-1 transition duration-300"
          >
            <a href={`/products/${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}

      </ul>
    )}
  </div>
);

};

export default Nav;
