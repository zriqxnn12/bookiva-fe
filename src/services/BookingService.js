import api from "../config/api";

export const createBooking = async (booking) => {
  const response = await api.post("/bookings", booking);
  return response.data;
};

export const getBookings = async (params) => {
  const response = await api.get(`/bookings`, { params });
  return response.data;
};

export const getBooking = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.patch(`/bookings/${id}/cancel`);
  return response.data;
};

export const getBookingStats = async () => {
  const response = await api.get(`/bookings/stats`);
  return response.data;
};
