// frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import API from "../utils/api"; // Changed from axios to API
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- THIS useEffect IS NOW CORRECT ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token is expired
          console.log("Token expired. Logging out.");
          localStorage.removeItem('token');
        } else {
          // Token is valid, set the user
          setUser({ 
              name: decoded.name, 
              email: decoded.email, 
              role: decoded.role 
          });
        }
        setUser({
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
      } catch (error) {
        // If token is invalid or expired
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    // Set user state from the API response directly
    setUser({
      name: data.name,
      email: data.email,
      role: data.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
