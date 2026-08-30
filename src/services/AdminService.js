import api from "../config/api";

export const getDashboardStats = async () => {
  const response = await api.get(`/admin/dashboard`);
  return response.data;
};

export const getAdminBookings = async (params) => {
  const response = await api.get(`/admin/bookings`, { params });
  return response.data;
};

export const updateBooking = async (id, newStatus) => {
  const response = await api.patch(`/admin/bookings/${id}/status`, {
    booking_status: newStatus,
  });
  return response.data;
};

export const createService = async (service) => {
  const response = await api.post(`/admin/services`, service);
  return response.data;
};

export const updateService = async (id, service) => {
  const response = await api.put(`/admin/services/${id}`, service);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/admin/services/${id}`);
  return response.data;
};
