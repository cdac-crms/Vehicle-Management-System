import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const loginUser = async (loginData) => {
  try {
    console.log(loginData)
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData);
    console.log("Login successful:", response.data);
    return response.data;  
  } catch (error) {
    console.error("Error logging in:", error.response?.data?.message || error.message);
    throw error;
  }
};
