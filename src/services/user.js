const { default: instance } = require("./config");

const getUsers = (search) => {
  if (search) {
    return instance.get(`users?search=${search}`);
  }
  return instance.get("users");
};

const getUser = (id) => {
  return instance.get(`users/${id}`);
};

const addUser = (user) => {
  return instance.post("users", user);
};

const updateUser = (user) => {
  return instance.put(`users/${user.id}`, user);
};

const deleteUser = (id) => {
  return instance.delete(`users/${id}`);
};
const getRoles = () => {
  return instance.get(`users/create`);
};
export { getUsers, getUser, addUser, updateUser, deleteUser, getRoles };
