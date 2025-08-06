
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/registerAdmin`, adminData);
    return response.data;
  } catch (error) {
    console.error("Error registering admin:", error.response?.data?.message || error.message);
    throw error;
  }
};
