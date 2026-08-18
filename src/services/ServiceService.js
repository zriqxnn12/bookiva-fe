import api from "../config/api";

export const getServices = async (params) => {
  const response = await api.get("/services", { params });
  return response.data;
};

export const getService = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};
