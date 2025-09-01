import axios from "axios";
import store from "../redux/store"; // <-- added

const API_BASE_URL = "http://localhost:8080/admin";

// Get token from Redux first (fallback to localStorage)
const getAuthToken = () => {
  const state = store.getState();
  return state.auth?.token || localStorage.getItem("token");
};

export const getAdminSummary = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/getSummary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // { vehicles: number, variants: number, companies: number }
  } catch (error) {
    console.error("Error fetching admin summary:", error.response?.data?.message || error.message);
    throw error;
  }
};
