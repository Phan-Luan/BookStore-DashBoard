import instance from "./config";

const getCompanies = (search) => {
  if (search) {
    return instance.get(`brands?search=${search}`);
  }
  return instance.get(`brands`);
};
const getCompany = (id) => {
  return instance.get(`brands/${id}`);
};
const addCompany = (company) => {
  return instance.post(`brands`, company);
};
const updateCompany = (company) => {
  return instance.put(`brands/${company.id}`, company);
};
const deleteCompany = (id) => {
  return instance.delete(`brands/${id}`);
};
export { getCompanies, getCompany, addCompany, updateCompany, deleteCompany };
