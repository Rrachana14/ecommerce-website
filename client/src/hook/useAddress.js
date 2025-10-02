import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const useAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  // ✅ Define fetchAddress at top level of the hook
  const fetchAddress = async () => {
    if (!auth?.token) {
      console.warn("Token not available yet");
      return;
    }

    try {
      const response = await axiosInstance.get("/address/getAddress", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setAddresses(response.data.addresses || []);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Failed to load the address");
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [auth.token]);

  const addAddress = async (newAddress) => {
    try {
      const response = await axiosInstance.post(
        "/address/addAddress",
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const addedAddress = response.data.address;
      setAddresses((prev) => [...prev, addedAddress]);
      return { success: true, address: addedAddress };
    } catch (err) {
      console.error("Add address error:", err);
      return {
        success: false,
        error: err?.response?.data?.message || "Failed to add address",
      };
    }
  };

  const deleteAddress = async (id) => {
    try {
      await axiosInstance.delete(`/address/deleteAddress/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      // ✅ Now this will work
      await fetchAddress();
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  return { addresses, error, addAddress, deleteAddress };
};

export default useAddress;
