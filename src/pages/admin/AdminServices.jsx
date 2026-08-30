import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { getServices } from "../../services/ServiceService";
import { getCategories } from "../../services/CategoryService";
import { Briefcase, Check, Pencil, Plus, Trash, X } from "lucide-react";
import { EmptyState, formatCurrency } from "../../helper/ui";
import {
  createService,
  deleteService,
  updateService,
} from "../../services/AdminService";
import toast from "react-hot-toast";
import TimeSlotBuilder from "../../components/TimeSlotBuilder";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  duration: "",
  location: "",
  category_id: "",
  isActive: true,
};

function AdminServices() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editService, setEditService] = useState(null);
  const [slots, setSlots] = useState([]);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["services-admin"],
    queryFn: () => getServices(),
  });

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const services = data?.data?.services || [];
  const categories = categoryData?.data || [];

  const createMutation = useMutation({
    mutationFn: (data) => createService(data),
    onSuccess: () => {
      toast.success("Service created!");
      queryClient.invalidateQueries(["services-admin"]);
      closeModal();
    },
    onError: (e) => toast.error(e.response?.data?.message || "Failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateService(id, data),
    onSuccess: () => {
      toast.success("Service updated!");
      queryClient.invalidateQueries(["services-admin"]);
      closeModal();
    },
    onError: (e) => toast.error(e.response?.data?.message || "Failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteService(id),
    onSuccess: () => {
      toast.success("Service deactivated!");
      queryClient.invalidateQueries(["services-admin"]);
    },
    onError: (e) => toast.error("Failed"),
  });

  // open create modal
  const openCreate = () => {
    setEditService(null);
    setForm(EMPTY_FORM);
    setSlots([]);
    setShowModal(true);
  };

  const openEdit = (s) => {
    setEditService(s);
    setForm({
      name: s.name,
      description: s.description,
      price: s.price,
      duration: s.duration,
      location: s.location || "",
      category_id: s.category_id,
      isActive: s.isActive,
    });

    setSlots(
      (s.time_slots || []).map((ts) => ({
        day_of_week: ts.day_of_week,
        start_time: ts.start_time,
        end_time: ts.end_time,
      })),
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditService(null);
    setForm(EMPTY_FORM);
    setSlots([]);
  };

  const validateSlots = () => {
    for (const s of slots) {
      if (s.start_time >= s.end_time) {
        toast.error(
          `A slot on ${DAYS[s.day_of_week - 1]} has bigger start time than end time`,
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateSlots()) return;

    if (editService) {
      updateMutation.mutate({ id: editService.id, data: { ...form, slots } });
    } else {
      createMutation.mutate({ ...form, slots });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <Helmet>
        <title>BookIva - Admin Services</title>

        <meta name="description" content="BookIva - Admin Services" />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Services</h2>
          <p className="text-slate-800 mt-1 text-sm mb-6">
            Manage all available services
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-primary flex items-center text-sm gap-2"
        >
          <Plus size={15} /> Add service
        </button>
      </div>

      {services.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          description="Create your first service"
          action={
            <button onClick={openCreate} className="btn-primary text-sm">
              Add service
            </button>
          }
        />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[
                  "Service",
                  "Category",
                  "Price",
                  "Duration",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">{s.name}</p>
                    <p className="text-xs truncate text-slate-400 max-w-48">
                      {s.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {s.category?.icon} {s.category?.name}
                  </td>
                  <td className="px-5 py-4 text-slate-600 font-semibold">
                    {formatCurrency(s.price)}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {s.duration} minute
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`badge ${s.isActive ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"}`}
                    >
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(s)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Deactive this service?")) {
                            deleteMutation.mutate(s.id);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">
                {editService ? "Edit service" : "Add new service"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm block font-medium text-slate-700 mb-1.5">
                  Service name<span className="text-red-500">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="e.g. Padel Court A"
                  required
                />
              </div>
              <div>
                <label className="text-sm block font-medium text-slate-700 mb-1.5">
                  Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="input resize-none"
                  placeholder="Describe the service..."
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm block font-medium text-slate-700 mb-1.5">
                    Price<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="input"
                    placeholder="150000"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-sm block font-medium text-slate-700 mb-1.5">
                    Duration (min)<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    className="input"
                    placeholder="60"
                    required
                    min="1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm block font-medium text-slate-700 mb-1.5">
                  Location<span className="text-red-500">*</span>
                </label>
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="input"
                  placeholder="e.g. Batam center"
                  required
                />
              </div>
              <div>
                <label className="text-sm block font-medium text-slate-700 mb-1.5">
                  Category<span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category_id}
                  onChange={(e) =>
                    setForm({ ...form, category_id: e.target.value })
                  }
                  className="input"
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {editService && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                    className="rounded"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-bold text-slate-700"
                  >
                    Service is active
                  </label>
                </div>
              )}

              {/* timeslot builder component */}
              <TimeSlotBuilder slots={slots} onChange={setSlots} />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary flex-1 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary flex-1 text-sm"
                >
                  {editService ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminServices;
