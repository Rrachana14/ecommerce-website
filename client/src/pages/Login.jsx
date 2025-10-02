import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");

  const [showForgotPassword, setShowForgotPassword] = useState(false); // show otp div
  const [forgotStep, setForgotStep] = useState(1);

  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // State for forgot password email and messages
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");

  const navigate = useNavigate();

  const { login ,userid} = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  // Handle forgot password email change
  const handleForgotEmailChange = (e) => {
    setForgotEmail(e.target.value);
  };

  const handleOtpChange = (e) => setOtp(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  // step - 1: send otp
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotMessage("");

    try {
      const res = await axiosInstance.post("/send-otp", {
        email: forgotEmail,
      });
      setForgotMessage(res.data.message || "OTP sent to your email.");
      setForgotStep(2);
    } catch (err) {
      setForgotError(err.response?.data?.message || "Error sending OTP.");
    }
  };

  // Step 2: Verify OTP and reset password
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotMessage("");
    console.log("calling verify otp reset");
    try {
      const res = await axiosInstance.post("/verify-otp-reset-password", {
        email: forgotEmail,
        otp,
        newPassword,
      });
      setForgotMessage(res.data.message);
      console.log("done", newPassword);
    } catch (err) {
      console.log("error verifying the otp", err);
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  // google login
  const handleGoogleCallback = async (response) => {
    const credential = response.credential;

    try {
      const res = await axiosInstance.post("/google-login", {
        token: credential,
      });
      const { token, user } = res.data;
      // console.log(data)
      login(res.data); 
      if (user.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Google login error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    /* global google */
    window.google?.accounts.id.initialize({
      client_id:
        "373110224504-f1pje0tk6g5ahm7ersvnni99k9kds0cb.apps.googleusercontent.com", // Google Client ID
      callback: handleGoogleCallback,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  // handling normal login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axiosInstance.post("/login", formData);
      console.log(response)
      const { token, user } = response.data;

      login(response.data); // Update global auth state
      // console.log("Login successful:", );

      if (user?.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center md:flex-row bg-[#004e98]">
      {/* Left Section */}
      <div className="md:w-1/2 h-full hidden md:block bg-[#004e98] ">
        <img src="" alt="Left section" className="w-full h-full object-cover" />
      </div>

      {/* Right Section */}
      <div className="w-full h-full md:w-1/2 flex flex-col justify-center items-center p-2 bg-white rounded-3xl shadow-2xl">
        <h2 className="h-fit font-bold text-4xl  md:text-6xl text-[#004e98] text-center mt-18 mb-16">
          Welcome
        </h2>
        <div className=" w-3/4 ">
          {!showForgotPassword ? (
            <>
              <div className=" h-fit mb-6">
                <h2 className="font-serif font-bold text-2xl h-fit">Sign in</h2>
                <h5 className=" text-md ">
                  or{" "}
                  <a href="/register" className="text-blue-500 font-serif ">
                    Create an account
                  </a>
                </h5>
              </div>
              <form onSubmit={handleSubmit} className="h-fit">
                {/* Email Field */}
                <div className="relative mb-6 ">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                     focus:border-blue-500 focus:bg-transparent outline-none transition-all duration-300 peer"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 text-sm w-fit h-fit px-1 transition-all duration-300 ${
                      formData.email
                        ? "top-[-2%] text-[#113954] bg-white -translate-y-1/2 font-semibold"
                        : "top-1/2 -translate-y-1/2 text-gray-400 peer-placeholder-shown:opacity-100"
                    }`}
                  >
                    Email
                  </label>
                </div>

                {/* Password Field */}
                <div className="relative mb-6 ">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                    focus:border-blue-500 outline-none transition-all duration-300 peer"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-4 text-sm bg-white h-fit w-fit px-1 transition-all duration-300 ${
                      formData.password
                        ? "top-[-2%] text-[#113954] -translate-y-1/2 font-semibold"
                        : "top-1/2 -translate-y-1/2 text-gray-400 peer-placeholder-shown:opacity-100"
                    }`}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 w-fit h-6"
                  >
                    {showPassword ? <EyeOff size={2} /> : <Eye size={2} />}
                  </button>
                </div>
                {/* Error Message */}
                {error && (
                  <div className="text-red-500 text-sm mb-3 ">{error}</div>
                )}
                {/* signin Button */}
                <button
                  type="submit"
                  className="w-full border-0 rounded-lg bg-[#004e98] py-2 h-14 text-white focus:ring focus:ring-[#0e6ba8]  uppercase hover:bg-blue-600"
                >
                  Sign in
                </button>
              </form>
              <div id="google-signin-btn" className="h-fit mt-3 mb-2"></div>
              <h5
                className="tracking-wide text-blue-500 text-sm cursor-pointer"
                onClick={() => {
                  setShowForgotPassword(true);
                  setForgotError("");
                  setForgotMessage("");
                }}
              >
                Forgotten Your Password ?
              </h5>
            </>
          ) : (
            <div className="max-w-lg">
              <h2 className="font-serif font-bold text-2xl h-fit mb-6">
                Forgot Password
              </h2>

              {forgotStep === 1 ? (
                // Step 1: Enter Email and Send OTP
                <form onSubmit={handleForgotSubmit} className="h-fit">
                  <div className="relative mb-6 ">
                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      value={forgotEmail}
                      onChange={handleForgotEmailChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                      focus:border-blue-500 outline-none transition-all duration-300 peer"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full border-0 rounded-lg bg-[#004e98] py-2 h-14 text-white focus:ring focus:ring-[#0e6ba8] uppercase hover:bg-blue-600"
                  >
                    Send OTP
                  </button>
                </form>
              ) : (
                // Step 2: Enter OTP and New Password
                <form onSubmit={handleVerifyOtp} className="h-fit">
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                      focus:border-blue-500 outline-none transition-all duration-300 peer"
                    />
                  </div>
                  <div className="relative mb-6">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border-2 border-gray-300 rounded-xl 
                      focus:border-blue-500 outline-none transition-all duration-300 peer"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full border-0 rounded-lg bg-[#004e98] py-2 h-14 text-white focus:ring focus:ring-[#0e6ba8] uppercase hover:bg-blue-600"
                  >
                    Verify OTP & Reset Password
                  </button>
                </form>
              )}

              {forgotMessage && (
                <p className="text-green-600 text-sm mt-3 h-fit">
                  {forgotMessage}
                </p>
              )}
              {forgotError && (
                <p className="text-red-600 text-sm mt-3 h-fit">{forgotError}</p>
              )}

              <h5
                className="tracking-wide text-blue-500 text-sm cursor-pointer mt-3"
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotStep(1);
                  setForgotEmail("");
                  setOtp("");
                  setNewPassword("");
                  setForgotError("");
                  setForgotMessage("");
                }}
              >
                Back to Login
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
