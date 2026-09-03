import api from "../config/api";

export const registerUser = async (user) => {
  const response = await api.post("/auth/register", user);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
