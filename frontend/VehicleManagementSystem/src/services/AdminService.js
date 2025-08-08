import axios from "axios";

const API_BASE_URL = "http://localhost:8080/admin";

// Utility to get the token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Register a new admin
export const registerAdmin = async (adminData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/registerAdmin`, adminData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error registering admin:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
