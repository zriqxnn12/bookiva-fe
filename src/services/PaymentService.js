import api from "../config/api";

export const createPayment = async (bookingId) => {
  const response = await api.post(`/payments/${bookingId}/create`);
  return response.data;
};
