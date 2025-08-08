import axios from "axios";

const API_BASE_URL = "http://localhost:8080/customer";

// Get the token from localStorage (or wherever you store it)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all customers
export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllCustomers`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching customers:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Get customer by ID
export const getCustomerById = async (customerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${customerId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching customer with ID ${customerId}:`,
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
