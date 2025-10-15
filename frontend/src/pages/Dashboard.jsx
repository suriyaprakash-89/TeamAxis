

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";


const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      if (user?.role === "Admin") {
        try {
          const { data } = await API.get("/api/reports/dashboard-summary");
          setSummary(data);
        } catch (error) {
          console.error("Failed to fetch dashboard summary:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>

      {user?.role === "Admin" && (
        <>
          {loading ? (
            <p>Loading dashboard...</p>
          ) : summary ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard
                title="Total Sales"
                value={`$${summary.totalSales.toLocaleString()}`}
              />
              <DashboardCard title="New Tasks" value={summary.newTasks} />
              <DashboardCard
                title="Active Team Members"
                value={summary.activeMembers}
              />
            </div>
          ) : (
            <p>Could not load dashboard data.</p>
          )}
          {/* You can add back the Recharts chart here, fetching data from another endpoint */}
        </>
      )}

      {user?.role === "Salesperson" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Your Tasks Overview</h2>
          <p className="mt-4">
            You can find your assigned tasks on the "My Tasks" page.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
