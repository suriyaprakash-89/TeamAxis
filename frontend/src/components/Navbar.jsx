import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell"; 
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
      <h1 className="text-xl font-semibold">Sales & Marketing Dashboard</h1>
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <span>
          Welcome, {user?.name} ({user?.role})
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
