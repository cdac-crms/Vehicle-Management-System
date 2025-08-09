import axios from "axios";

const API_BASE_URL = "http://localhost:8080/payment";

// Utility to get the token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Get all payments
export const getAllPayments = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching payments:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
