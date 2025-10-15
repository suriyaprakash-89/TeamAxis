import React, { useState } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";

// We no longer need the Modal or LocationMap component for this solution

const TaskCard = ({ task }) => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return toast.error("Please select a file.");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        uploadFile({ latitude, longitude });
      },
      () => {
        toast.error("Could not get location. Uploading without it.");
        uploadFile(null);
      }
    );
  };

  const uploadFile = async (location) => {
    const formData = new FormData();
    formData.append("media", file);
    if (location) {
      formData.append("latitude", location.latitude);
      formData.append("longitude", location.longitude);
    }

    try {
      const toastId = toast.loading("Uploading media...");
      await API.post(`/api/tasks/${task._id}/media`, formData);
      toast.success("Media uploaded! Refresh to see changes.", { id: toastId });
    } catch (error) {
      toast.error("Upload failed.", { id: toastId });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">{task.title}</h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            task.status === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        Assigned to: {task.assignedTo.name}
      </p>
      <p className="mt-2">{task.description}</p>

      {/* --- UPDATED LOCATION LINK --- */}
      {task.location?.latitude && (
        <div className="mt-4">
          <a
            href={`https://www.google.com/maps?q=${task.location.latitude},${task.location.longitude}`}
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security best practice
            className="text-sm text-blue-600 hover:underline font-semibold"
          >
            View Upload Location on Map
          </a>
        </div>
      )}

      <div className="mt-4 pt-4 border-t">
        <label className="block text-sm font-medium text-gray-700">
          Upload Media
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-sm"
          />
          <button
            onClick={handleUpload}
            className="ml-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
