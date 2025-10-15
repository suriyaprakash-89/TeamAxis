

import React, { createContext, useState, useEffect } from "react";
import API from "../utils/api";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          
          console.log("Token expired. Logging out.");
          localStorage.removeItem('token');
        } else {
          
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
        
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    
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
