import instance from "./config";
const login = (data) => {
  return instance.post("login", data);
};
const register = (data) => {
  return instance.post("register", data);
};
const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("tokenTimestamp");
  window.location.reload();
};
export { login, register, logout };
