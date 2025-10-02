import React, { useEffect, useState } from "react";
import useAddress from "../hook/useAddress";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DeliveryPage = () => {
  const { addresses, error, addAddress, deleteAddress } = useAddress();
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Home",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
  });
  const {auth} = useAuth();
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

   useEffect(() => {
    if (!auth?.token) {
      navigate("/login");
    }
  }, [auth, navigate]);


  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleProceed = () => {
    if (!selectedId) {
      alert("Please select a delivery address");
      return;
    }
    navigate("/payment", { state: { addressId: selectedId } });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, error } = await addAddress(form);
    if (success) {
      setShowForm(false);
      setForm({
        name: "",
        type: "",
        AddressLine: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      });
      setFormError("");
    } else {
      setFormError(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Select Delivery Address</h2>

      {error && <p className="text-red-500">{error}</p>}

      {addresses.length === 0 ? (
        <p>No saved addresses. Please add one.</p>
      ) : (
        <div className="grid gap-4 mb-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-4 border rounded shadow-sm transition hover:shadow-md relative ${
                selectedId === addr._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => handleSelect(addr._id)}
                >
                  <h3 className="font-semibold text-lg">
                    {addr.name} ({addr.type})
                  </h3>
                  <p>
                    {addr.addressLine}, {addr.city}, {addr.state} -{" "}
                    {addr.pincode}
                  </p>
                  <p>Phone: {addr.phone}</p>
                </div>
                <button
                  onClick={() => deleteAddress(addr._id)}
                  className="text-red-600 font-bold hover:text-red-800 ml-4"
                  title="Delete Address"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleProceed}
        >
          Proceed to Payment
        </button>
        <button
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          onClick={() => setShowForm(true)}
        >
          + Add New Address
        </button>
      </div>

      {/* Modal for Address Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
            <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
            {formError && <p className="text-red-500">{formError}</p>}
            <form onSubmit={handleSubmit} className="grid gap-3">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>

              <input
                name="addressLine"
                placeholder="Address Line"
                value={form.addressLine}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="country"
                placeholder="Country"
                value={form.country || "India"}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault || false}
                  onChange={(e) =>
                    setForm({ ...form, isDefault: e.target.checked })
                  }
                />
                <label htmlFor="isDefault">Set as default address</label>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormError("");
                  }}
                  className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;
