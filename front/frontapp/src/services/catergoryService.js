import axiosApi from "../config/axios";

const CATEGORY_ENDPOINT = "/categories";

// Fetch all categories
const findAllCategories = async () => {
  return await axiosApi.get(`${CATEGORY_ENDPOINT}`);
};

// Add a new category
const addCategory = async (categoryData) => {
  return await axiosApi.post(`${CATEGORY_ENDPOINT}`, categoryData);
};

// Delete a category by its ID
const deleteCategory = async (id) => {
  return await axiosApi.delete(`${CATEGORY_ENDPOINT}/${id}`);
};

export default { findAllCategories, addCategory, deleteCategory };
