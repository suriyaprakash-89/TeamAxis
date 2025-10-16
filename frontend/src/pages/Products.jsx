import React, { useState, useEffect, useContext } from "react";
import API from "../utils/api";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-2xl font-bold text-gray-500 hover:text-gray-800"
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // State for new product form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/api/products");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/api/products/categories");
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productData = { name, description, price, stock, category };
    const toastId = toast.loading("Adding product...");
    try {
      await API.post("/api/products", productData);
      toast.success("Product added successfully!", { id: toastId });
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error("Failed to add product.", { id: toastId });
    }
  };

  const canAddProducts = user?.role === "Admin" || user?.role === "Salesperson";

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        {canAddProducts && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2 px-4 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            + Add New Product
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No products have been added yet.</p>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
          {categories.length > 0 ? (
            <form onSubmit={handleAddProduct}>
              {/* Form fields... */}
              <div className="mb-4">
                <label>Product Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg bg-white"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label>Price ($)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save Product
              </button>
            </form>
          ) : (
            <p className="text-gray-500 bg-yellow-50 p-4 rounded-md">
              An Admin must create a Product Category before you can add a
              product. Please contact your manager.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Products;
