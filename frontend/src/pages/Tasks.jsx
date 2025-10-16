import React, { useState, useEffect, useContext } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // State for the new task form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [salespeople, setSalespeople] = useState([]);

  useEffect(() => {
    fetchTasks();
    if (user?.role === "Admin") {
      fetchSalespeople();
    }
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/api/tasks");
      setTasks(data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchSalespeople = async () => {
    try {
      const { data } = await API.get("/api/auth/salespeople");
      setSalespeople(data);
    } catch (error) {
      toast.error("Could not load user list");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title || !assignedTo) {
      return toast.error("Title and Assigned To are required.");
    }
    const toastId = toast.loading("Creating task...");
    try {
      await API.post("/api/tasks", { title, description, assignedTo });
      toast.success("Task created and assigned!", { id: toastId });
      setTitle("");
      setDescription("");
      setAssignedTo("");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to create task.", { id: toastId });
    }
  };

  return (
    <div className="p-8">
      {/* --- TASK CREATION FORM FOR ADMIN --- */}
      {user?.role === "Admin" && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Create & Assign New Task</h2>
          {salespeople.length > 0 ? (
            <form onSubmit={handleCreateTask}>
              {/* Form fields... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Task Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Assign To</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-white"
                    required
                  >
                    <option value="" disabled>
                      Select a Salesperson
                    </option>
                    {salespeople.map((sp) => (
                      <option key={sp._id} value={sp._id}>
                        {sp.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  rows="3"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-4 py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Assign Task
              </button>
            </form>
          ) : (
            <p className="text-gray-500 bg-yellow-50 p-4 rounded-md">
              There are no salespeople in the system to assign tasks to. Please
              register a new user with the "Salesperson" role first.
            </p>
          )}
        </div>
      )}

      {/* --- TASK LIST --- */}
      <h1 className="text-3xl font-bold mb-6">
        {user?.role === "Admin" ? "All Tasks" : "My Assigned Tasks"}
      </h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task._id} task={task} />)
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No tasks found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
