import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { getUsers } from "../../services/AdminService";
import { EmptyState } from "../../helper/ui";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { format } from "date-fns";

function AdminUsers() {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => getUsers({ page, limit: 8 }),
  });

  const users = data?.data?.users || [];
  const pagination = data?.data.pagination || null;

  return (
    <>
      <Helmet>
        <title>BookIva - Admin Users</title>

        <meta name="description" content="BookIva - Admin Users" />
      </Helmet>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Users</h2>
        <p className="text-slate-800 mt-1 text-sm">All registered customers</p>
      </div>
      <div className="card overflow-hidden">
        {users.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No users found"
            description="Users will appear here after registration"
          />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Name", "Phone", "Bookings", "Joined", "Auth"].map((h) => (
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex gap-3 items-center">
                      <div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center 
          text-white text-sm font-bold overflow-hidden"
                      >
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          user.name?.[0]?.toUpperCase()
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-900">{user.phone}</td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-slate-900">
                      {user._count?.bookings || 0}
                    </span>
                    <span className="ml-1 text-slate-400">bookings</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                    {format(new Date(user.created_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`badge ${user.googleId ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {user.googleId ? "🔵 Google" : "📧 Email"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* pagination */}
        {pagination && pagination.totalPage > 1 && (
          <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between text-sm">
            <span>
              Showing {(page - 1) * 10 + 1}
              {Math.min(page * 10, pagination.total)} of {pagination.total}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-40"
              >
                <ArrowLeft size={10} className="mr-1" /> Prev
              </button>
              <button
                disabled={page === pagination.totalPage}
                onClick={() => setPage((p) => p + 1)}
                className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-40"
              >
                Next <ArrowRight size={10} className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminUsers;
