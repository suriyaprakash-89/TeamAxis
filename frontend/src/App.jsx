import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Billing from "./pages/Billing";
import AdminCategories from "./pages/AdminCategories";
import MoodBoard from "./pages/MoodBoard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <h1 className="text-center text-sm text-white font-bold p-2 bg-red-600">
          Deployment Version: V5_FINAL_FIX
        </h1>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes with shared layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/mood-board" element={<MoodBoard />} />
              {/* Admin-only route */}
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/reports" element={<Reports />} />
                <Route path="/admin/categories" element={<AdminCategories />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
