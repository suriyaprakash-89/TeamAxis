import React from "react";
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

// Mock data for reports
const performanceData = [
  { name: "Alice", tasksCompleted: 12 },
  { name: "Bob", tasksCompleted: 18 },
  { name: "Charlie", tasksCompleted: 9 },
  { name: "David", tasksCompleted: 15 },
];

const Reports = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Reports</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Employee Performance (Tasks Completed)
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasksCompleted" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
