import { Palette } from "lucide-react";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({ token: null, user: null , isAdmin:false});
  const [loading, setLoading] = useState(true); 

  // Load token from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("authUser"));

    console.log("storedUser", storedUser)
    if (token && storedUser) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        console.log("in useeffect",payload)

        if (isExpired) {
          logout();
        } else {

          setAuth({ token, user: storedUser, isAdmin : storedUser.isAdmin});

          console.log("in useeffect",auth)
          console.log("Token loaded:", token);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
  console.log("Auth updated:", auth);
}, [auth]);

  const login = (data) => {
    try {
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      
      console.log("in login",payload)
      console.log("in login", data.user);

      setAuth({ token : data.token, user: data.user , isAdmin : payload.isAdmin});

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));

    } catch (error) {
      console.error("Invalid token during login:", error);
    }
  };

  const logout = () => {
    setAuth({ token: null, user: null ,isAdmin:false});
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ auth,loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
