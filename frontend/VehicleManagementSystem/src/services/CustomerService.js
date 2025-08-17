import axios from "axios";

const API_BASE_URL = "http://localhost:8080/customer";

const getAuthToken = () => localStorage.getItem("token");

// Get all customers
export const getAllCustomers = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/getAllCustomers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Get customer by ID
export const getCustomerById = async (customerId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customer:", error.response?.data?.message || error.message);
    throw error;
  }
};
