import React, { useState, useEffect, useContext } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const TaskCard = ({ task }) => {
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    // Get location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        uploadWithLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast.error("Could not get location. Uploading without it.");
        uploadWithLocation(null); // Proceed without location
      }
    );
  };

  const uploadWithLocation = async (loc) => {
    const formData = new FormData();
    formData.append("media", file);
    if (loc) {
      formData.append("latitude", loc.latitude);
      formData.append("longitude", loc.longitude);
    }

    try {
      await API.post(`/api/tasks/${task._id}/media`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Media uploaded successfully!");
    } catch (error) {
      toast.error("Media upload failed.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold">{task.title}</h3>
      <p>Assigned to: {task.assignedTo.name}</p>
      <p>Status: {task.status}</p>
      <div className="mt-4">
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-3 py-1 rounded-md ml-2"
        >
          Upload Media
        </button>
      </div>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get("/api/tasks");
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
