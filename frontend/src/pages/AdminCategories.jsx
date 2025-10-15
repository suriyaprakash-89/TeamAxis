import React, { useState, useEffect } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingCategory, setEditingCategory] = useState(null); // State to hold category being edited
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/api/products/categories");
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const categoryData = { name, description };

    try {
      if (editingCategory) {
        // Update logic
        const toastId = toast.loading("Updating category...");
        await API.put(
          `/api/products/categories/${editingCategory._id}`,
          categoryData
        );
        toast.success("Category updated!", { id: toastId });
      } else {
        // Create logic
        const toastId = toast.loading("Creating category...");
        await API.post("/api/products/categories", categoryData);
        toast.success("Category created!", { id: toastId });
      }
      resetForm();
      fetchCategories(); // Re-fetch to show updated list
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const toastId = toast.loading("Deleting category...");
        await API.delete(`/api/products/categories/${categoryId}`);
        toast.success("Category deleted!", { id: toastId });
        fetchCategories(); // Re-fetch
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete category"
        );
      }
    }
  };

  const startEdit = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Product Categories</h1>

      {/* Form Card */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {editingCategory ? "Edit Category" : "Create New Category"}
        </h2>
        <form onSubmit={handleCreateOrUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
            ></textarea>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {editingCategory ? "Update Category" : "Save Category"}
            </button>
            {editingCategory && (
              <button
                type="button"
                onClick={resetForm}
                className="py-2 px-4 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Categories List Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Existing Categories</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li
                key={cat._id}
                className="flex justify-between items-center p-4 border rounded-md"
              >
                <div>
                  <h3 className="font-bold">{cat.name}</h3>
                  <p className="text-sm text-gray-600">{cat.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
