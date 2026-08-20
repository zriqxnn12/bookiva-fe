import api from "../config/api";

export const getServices = async (params) => {
  const response = await api.get("/services", { params });
  return response.data;
};

export const getService = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

// for time slots service
export const getSlots = async (id, date) => {
  const response = await api.get(`/services/${id}/slots`, { params: { date } });
  return response.data;
};
