import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SidebarLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 mt-2 text-sm font-semibold rounded-lg ${
        isActive ? "bg-blue-500 text-white" : "text-gray-900 hover:bg-gray-200"
      }`
    }
  >
    {children}
  </NavLink>
);

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-64 bg-white shadow-md flex-shrink-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-blue-600">TeamAxis</h2>
        <nav className="mt-10">
          <SidebarLink to="/">Dashboard</SidebarLink>
          <SidebarLink to="/tasks">My Tasks</SidebarLink>
          <SidebarLink to="/products">Products</SidebarLink>
          <SidebarLink to="/mood-board">Mood Board</SidebarLink>
          <SidebarLink to="/billing">Billing</SidebarLink>

          {user?.role === "Admin" && (
            <>
              <hr className="my-4" />
              <p className="px-4 text-xs text-gray-500 uppercase">Admin</p>
              <SidebarLink to="/reports">Reports</SidebarLink>
              <SidebarLink to="/admin/categories">Manage Categories</SidebarLink>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
