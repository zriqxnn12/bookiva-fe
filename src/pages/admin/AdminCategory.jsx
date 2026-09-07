import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { getCategories } from "../../services/CategoryService";
import { EmptyState } from "../../helper/ui";
import { Pencil, Plus, Subtitles, Trash, X } from "lucide-react";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../services/AdminService";
import toast from "react-hot-toast";

const EMPTY_FORM = {
  name: "",
  icon: "",
};

function AdminCategory() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editCategory, setEditCategory] = useState(null);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const categories = data?.data || [];

  const createMutation = useMutation({
    mutationFn: (data) => createCategory(data),
    onSuccess: () => {
      toast.success("Service created!");
      queryClient.invalidateQueries(["categories"]);
      closeModal();
    },
    onError: (e) => toast.error(e.response?.data?.message || "Failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => {
      toast.success("Category updated!");
      queryClient.invalidateQueries(["categories"]);
      closeModal();
    },
    onError: (e) => toast.error(e.response?.data?.message || "Failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Category deleted!");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (e) => toast.error(e.response?.data?.message || "Failed"),
  });

  const openCreate = () => {
    setEditCategory(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditCategory(c);
    setForm({
      name: c.name,
      icon: c.icon,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditCategory(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editCategory) {
      updateMutation.mutate({ id: editCategory.id, data: { ...form } });
    } else {
      createMutation.mutate({ ...form });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <Helmet>
        <title>BookIva - Admin Categories</title>

        <meta name="description" content="BookIva - Admin Categories" />
      </Helmet>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Categories</h2>
          <p className="text-slate-800 mt-1 text-sm mb-6">
            Manage all available categories
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-primary flex items-center text-sm gap-2"
        >
          <Plus size={15} /> Add category
        </button>
      </div>
      <div className="card overflow-hidden">
        {categories.length === 0 ? (
          <EmptyState
            icon={Subtitles}
            title="No categories found"
            description="Please add new category data"
            action={
              <button className="btn-primary text-sm">Add category</button>
            }
          />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Category", "Action"].map((h) => (
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
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-slate-600">
                    {c.icon} {c.name}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this category")) {
                            deleteMutation.mutate(c.id);
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
        )}

        {/* modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
              {/* header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">
                  {editCategory ? "Edit category" : "Add new category"}
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
                    Category name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    placeholder="e.g. Sports"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm block font-medium text-slate-700 mb-1.5">
                    Icon
                  </label>
                  <input
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="input"
                    placeholder="add emoji (ex: 🎾)"
                    required
                  />
                </div>
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
                    {editCategory ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminCategory;
