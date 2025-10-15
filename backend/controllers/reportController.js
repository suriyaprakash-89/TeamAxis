// backend/controllers/reportController.js

import Invoice from "../models/Invoice.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

// @desc    Get dashboard analytics
// @route   GET /api/reports/dashboard-summary
// @access  Private/Admin
export const getDashboardSummary = async (req, res) => {
  try {
    const totalSalesResult = await Invoice.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } },
    ]);

    const totalSales =
      totalSalesResult.length > 0 ? totalSalesResult[0].totalAmount : 0;
    const newTasks = await Task.countDocuments({ status: "Pending" });
    const activeMembers = await User.countDocuments({ role: "Salesperson" }); // Example criteria

    res.json({
      totalSales,
      newTasks,
      activeMembers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
