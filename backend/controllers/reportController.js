import Invoice from "../models/Invoice.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const totalSalesResult = await Invoice.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } },
    ]);

    const totalSales =
      totalSalesResult.length > 0 ? totalSalesResult[0].totalAmount : 0;
    const newTasks = await Task.countDocuments({ status: "Pending" });
    const activeMembers = await User.countDocuments({ role: "Salesperson" });

    res.json({
      totalSales,
      newTasks,
      activeMembers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPerformanceReport = async (req, res) => {
  try {
    const performanceData = await Task.aggregate([
      { $match: { status: "Completed" } }, // Only count completed tasks
      {
        $group: {
          _id: "$assignedTo", // Group by the user ID in the 'assignedTo' field
          tasksCompleted: { $sum: 1 }, // Count 1 for each task
        },
      },
      {
        $lookup: {
          // Join with the User collection to get the user's name
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" }, // Deconstruct the userDetails array
      {
        $project: {
          // Select the final fields to return
          name: "$userDetails.name",
          tasksCompleted: 1,
          _id: 0,
        },
      },
    ]);
    res.json(performanceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
