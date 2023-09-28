import instance from "./config";

const getCategories = (search) => {
  if (search) {
    return instance.get(`categories?search=${search}`);
  }
  return instance.get(`categories`);
};
const getCategory = (id) => {
  return instance.get(`categories/${id}`);
};
const addCategory = (category) => {
  return instance.post(`categories`, category);
};
const updateCategory = (category) => {
  return instance.put(`categories/${category.id}`, category);
};
const deleteCategory = (id) => {
  return instance.delete(`categories/${id}`);
};
export {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
