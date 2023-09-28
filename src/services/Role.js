import instance from "./config";

export const getRole = async () => {
  try {
    return await instance.get("roles");
  } catch (error) {
    console.log(error);
  }
};
export const getPermission = async () => {
  try {
    return await instance.get("roles/create");
  } catch (error) {
    console.log(error);
  }
};
export const postRole = async (post) => {
  try {
    return await instance.post(roles, post);
  } catch (error) {
    console.log(error);
  }
};
export const destroyRole = async (id) => {
  try {
    return await instance.destroy(`roles/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export const editRole = async (post, id) => {
  try {
    return await instance.updateForm(`roles/${id}`, post);
  } catch (error) {
    console.log(error);
  }
};

export const detailRole = async (id) => {
  try {
    return await instance.get(`roles/${id}`);
  } catch (error) {
    console.log(error);
  }
};
