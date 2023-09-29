import instance from "./config";

export const getRole = async () => {
  return await instance.get("roles");
};
export const getPermission = async () => {
  return await instance.get("roles/create");
};
export const postRole = async (post) => {
  return await instance.post("roles", post);
};
export const destroyRole = async (id) => {
  return await instance.delete(`roles/${id}`);
};
export const editRole = async (post, id) => {
  return await instance.updateForm(`roles/${id}`, post);
};

export const detailRole = async (id) => {
  return await instance.get(`roles/${id}`);
};
