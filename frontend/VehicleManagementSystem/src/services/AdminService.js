import axios from "axios";
import store from "../redux/store"; // <-- added

const API_BASE_URL = "http://localhost:8080/admin";

// Get token from Redux first (fallback to localStorage)
const getAuthToken = () => {
  const state = store.getState();
  return state.auth?.token || localStorage.getItem("token");
};

// Register a new admin
export const registerAdmin = async (adminData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/registerAdmin`, adminData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Error registering admin:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
