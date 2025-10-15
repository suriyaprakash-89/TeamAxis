import React, { useState, useEffect } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";

const MoodBoard = () => {
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/api/moodboard");
      setEntries(data);
    } catch (error) {
      toast.error("Failed to fetch mood board entries.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !summary) {
      return toast.error("Please provide an image and a summary.");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("summary", summary);

    const toastId = toast.loading("Posting to mood board...");
    try {
      await API.post("/api/moodboard", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Entry posted!", { id: toastId });
      
      setImage(null);
      setSummary("");
      document.getElementById("image-input").value = null; 
      fetchEntries();
    } catch (error) {
      toast.error("Failed to post entry.", { id: toastId });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Team Mood Board</h1>

      {/* Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Post a Daily Update</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Summary / Mood</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="What did you achieve today?"
              rows="3"
              maxLength="280"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload a Picture</label>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Post Update
          </button>
        </form>
      </div>

      {/* Entries Grid */}
      {loading ? (
        <p>Loading entries...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={entry.image}
                alt="Mood board entry"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-700">{entry.summary}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p className="font-semibold">{entry.user.name}</p>
                  <p>{new Date(entry.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodBoard;
