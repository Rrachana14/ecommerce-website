import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: {
      city: "",
      state: "",
    },
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "state") {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/register", formData);
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
      setError("User already exist");
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div id="left" className="w-[35%] bg-black">
        <img src="" alt="Left section" className="w-full h-full object-cover" />
      </div>

      <div id="right" className="w-[65%] h-16 flex flex-col px-16">
        <div className="mx-8">
          <h2 className="font-bold text-4xl  text-[#004e98] mt-10">
            Registration
          </h2>
          <h5 className="font-extralight tracking-wider text-md">
            Enter your details to register
          </h5>
        </div>

        <div className="bg-white p-8 rounded-2xl w-full h-[60vh] my-28">
          <form
            className="w-[100%] "
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="flex w-full gap-4   mb-6">
              <div className="relative w-1/2 h-10 ">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full   px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                   focus:border-blue-500 outline-none transition-all duration-300 peer"
                />
                <label
                  htmlFor="email"
                  className={`absolute w-fit h-fit left-4 text-sm bg-white px-1 transition-all duration-300 ${
                    formData.email
                      ? "top-[-4%] text-[#113954] -translate-y-1/2 font-semibold " // When there's input, label stays at the top
                      : "top-1/2 -translate-y-1/2 text-gray-400 peer-placeholder-shown:opacity-100"
                  }`}
                >
                  Email
                </label>
              </div>
              <div className="relative  w-1/2 ">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  className="w-full  px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                  focus:border-blue-500 outline-none transition-all duration-300 peer"
                />
                <label
                  htmlFor="password"
                  className={`absolute w-fit h-fit left-4 text-sm bg-white px-1 transition-all duration-300 ${
                    formData.password
                      ? "top-[-4%] text-[#113954] -translate-y-1/2 font-semibold " // When there's input, label stays at the top
                      : "top-1/2 -translate-y-1/2 text-gray-400 peer-placeholder-shown:opacity-100"
                  }`}
                >
                  Password
                </label>
              </div>
            </div>
            <div className="flex  mb-6 w-full gap-4 h-10">
              <div className="relative mb-6 w-1/2  ">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  required
                  onChange={handleChange}
                  className="w-full  px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                  focus:border-blue-500 outline-none transition-all duration-300 peer"
                />
                <label
                  htmlFor="username"
                  className={`absolute w-fit h-fit left-4 text-sm bg-white px-1 transition-all duration-300 ${
                    formData.username
                      ? "top-[-4%] text-[#113954] -translate-y-1/2 font-semibold " // When there's input, label stays at the top
                      : "top-1/2 -translate-y-1/2 text-gray-400 peer-placeholder-shown:opacity-100"
                  }`}
                >
                  username
                </label>
              </div>
              <div className="relative mb-6 w-1/2 ">
                <input
                  type="tel"
                  name="phoneNumber"
                  pattern="[0-9]{10}"
                  value={formData.phoneNumber}
                  required
                  onChange={handleChange}
                  className="w-full  px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                  focus:border-blue-500 outline-none transition-all duration-300 peer"
                />
                <label
                  htmlFor="phoneNumber"
                  className={`absolute w-fit h-fit left-4 text-sm bg-white px-1 transition-all duration-300 ${
                    formData.phoneNumber
                      ? "top-[-4%] text-[#113954] -translate-y-1/2 font-semibold " // When there's input, label stays at the top
                      : "top-1/2 -translate-y-1/2 text-gray-400 peer-placeholder-shown:opacity-100"
                  }`}
                >
                  phone number
                </label>
              </div>
            </div>
            <div className="flex  mb-6 w-full gap-4 h-10">
              <div className="relative  mb-6 h-14 w-1/2">
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full  px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                   focus:border-blue-500 outline-none transition-all duration-300 peer"
                />
                <label
                  htmlFor="city"
                  className={`absolute  w-fit h-fit left-4 text-sm bg-white px-1 transition-all duration-300 ${
                    formData.address.city
                      ? "top-[-4%] text-[#113954] -translate-y-1/2 font-semibold " // When there's input, label stays at the top
                      : "top-1/2 -translate-y-1/2 text-gray-400 peer-placeholder-shown:opacity-100"
                  }`}
                >
                  City
                </label>
              </div>
              <div className="relative  mb-6 h-14 w-1/2">
                <input
                  type="text"
                  name="state"
                  value={formData.address.state}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full  px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                   focus:border-blue-500 outline-none transition-all duration-300 peer"
                />
                <label
                  htmlFor="state"
                  className={`absolute  w-fit h-fit left-4 text-sm bg-white px-1 transition-all duration-300 ${
                    formData.address.state
                      ? "top-[-4%] text-[#113954] -translate-y-1/2 font-semibold " // When there's input, label stays at the top
                      : "top-1/2 -translate-y-1/2 text-gray-400 peer-placeholder-shown:opacity-100"
                  }`}
                >
                  state
                </label>
              </div>
            </div>

            {error && (
              <p style={{ color: "red" }} className="h-10 my-4">
                {error}
              </p>
            )}
            <button className="w-full h-10 rounded-lg bg-[#004e98] py-2 text-white focus:ring focus:ring-[#0e6ba8] mb-4 uppercase hover:bg-[#]">
              Sign up
            </button>
          </form>
          <h5 className="tracking-wide text-center ">
            Already have an account?
            <a href="/login" className="text-[#0081a7] underline font-serif ">
              Sigin
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Register;
