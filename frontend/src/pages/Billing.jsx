import React, { useState } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";

const Billing = () => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    const invoiceData = { clientName, clientEmail, products: [], totalAmount };

    try {
      const toastId = toast.loading("Generating invoice...");
      await API.post("/api/invoices", invoiceData);
      toast.success("Invoice generated and sent!", { id: toastId });
      // Reset form
      setClientName("");
      setClientEmail("");
      setTotalAmount(0);
    } catch (error) {
      toast.error("Failed to generate invoice.", { id: toastId });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Billing & Invoices</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Generate New Invoice
        </h2>
        <form onSubmit={handleGenerateInvoice}>
          <div className="mb-4">
            <label className="block text-gray-700">Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Client Email</label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Total Amount ($)</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Generate & Email Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default Billing;
