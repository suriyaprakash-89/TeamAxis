import React, { createContext, useState, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchTasks = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await API.get("/api/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
};
