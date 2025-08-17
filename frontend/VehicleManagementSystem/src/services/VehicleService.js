import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/vehicle';

// Helper to get token from localStorage
const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // No token, return empty config object without Authorization header
    return {};
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isMultipart && { "Content-Type": "multipart/form-data" }),
    },
  };
};


// Add Vehicle
export const addVehicle = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addVehicle`,
      formData,
      getAuthHeaders(true)
    );
    return response.data;
  } catch (error) {
    console.error("Error adding vehicle:", error.response?.data?.message || error.message);
    throw error;
  }
};



export const getAllVehicles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllVehicles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error.response?.data?.message || error.message);
    throw error;
  }
};


// Get Vehicle by ID
export const getVehicleById = async (vehicleId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getVehicleById/${vehicleId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Update Vehicle
export const updateVehicle = async (vehicleId, formData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${vehicleId}`,
      formData,
      getAuthHeaders(true)
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete Vehicle
export const deleteVehicle = async (vehicleId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/delete/${vehicleId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error.response?.data?.message || error.message);
    throw error;
  }
};
