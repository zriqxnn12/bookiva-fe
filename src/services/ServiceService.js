import api from "../config/api";

export const getServices = async (params) => {
  const response = await api.get("/services", { params });
  return response.data;
};
