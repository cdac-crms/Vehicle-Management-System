import axios from "axios";

const API_BASE_URL = "http://localhost:8080/company";

// Add a new company
export const addCompany = async (companyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addCompany`, companyData);
    return response.data;
  } catch (error) {
    console.error("Error adding company:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Get all companies
export const getAllCompanies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllCompanies`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Get company by ID
export const getCompanyById = async (companyId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getCompany/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company:", error.response?.data?.message || error.message);
    throw error;
  }
};
