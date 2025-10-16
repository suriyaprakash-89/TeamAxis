import React, { useState, useEffect } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const { data } = await API.get("/api/reports/performance");
        setPerformanceData(data);
      } catch (error) {
        toast.error("Could not fetch performance data.");
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Reports</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Employee Performance (Tasks Completed)
        </h2>
        {loading ? (
          <p>Loading report...</p>
        ) : performanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasksCompleted" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No completed tasks to display.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
