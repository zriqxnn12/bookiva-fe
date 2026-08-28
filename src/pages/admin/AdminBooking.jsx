import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { getAdminBookings, updateBooking } from "../../services/AdminService";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Filter,
  Search,
} from "lucide-react";
import { EmptyState, formatCurrency, StatusBadge } from "../../helper/ui";
import { format } from "date-fns";

const STATUSES = [
  "",
  "WAITING_PAYMENT",
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
];

const STATUS_LABELS = {
  "": "All",
  WAITING_PAYMENT: "Waiting Payment",
  PENDING: "Pending",
  CONFIRMED: "Comfirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const NEXT_STATUSES = {
  WAITING_PAYMENT: ["PENDING", "CANCELLED"],
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

function AdminBooking() {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["admin-bookings", bookingStatus, search, page],
    queryFn: () =>
      getAdminBookings({
        bookingStatus: bookingStatus || undefined,
        search: search || undefined,
        page,
        limit: 10,
      }),
  });

  const bookings = data?.data?.bookings || [];
  const pagination = data?.data.pagination || null;

  const updateMutation = useMutation({
    mutationFn: ({ id, newStatus }) => updateBooking(id, newStatus),
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries(["admin-bookings"]);
    },
    onError: () => (err) => toast.error("Update error!"),
  });

  return (
    <>
      <Helmet>
        <title>BookIva - Admin Bookings</title>

        <meta name="description" content="BookIva - Admin Bookings" />
      </Helmet>

      <div>
        <h2 className="text-2xl font-bold text-slate-900">Bookings</h2>
        <p className="text-slate-800 mt-1 text-sm mb-6">
          Manage all customer bookings
        </p>

        <div className="card p-4 mb-5 flex flex-col sm:flex-row gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(searchInput);
              setPage(1);
            }}
            className="flex gap-2 flex-1"
          >
            <div className="flex-1 relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by customer or service..."
                className="input pl-9 text-sm"
              />
            </div>
            <button type="submit" className="btn-primary px-4 py-2 text-sm">
              Search
            </button>
          </form>
          <div className="flex gap-2 items-center">
            <Filter size={15} className="text-slate-400 shrink-0" />
            <select
              value={bookingStatus}
              onChange={(e) => {
                setBookingStatus(e.target.value);
                setPage(1);
              }}
              className="input text-sm py-2 w-44"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="card overflow-hidden">
          {bookings.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No booking found"
              description="Try adjusting your filters"
            />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {[
                    "Customer",
                    "Service",
                    "Date & Time",
                    "Amount",
                    "Status",
                    "Action",
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
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {booking.user.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {booking.user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      <p>{booking.service.name}</p>
                      <p className="text-xs text-slate-400">
                        {booking.service.category?.name}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-700 whitespace-nowrap">
                      <p>
                        {format(new Date(booking.booking_date), "MMM, d, yyyy")}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {booking.time_slot.start_time} -{" "}
                        {booking.time_slot.end_time}
                      </p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {formatCurrency(booking.total_amount)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={booking.booking_status} />
                    </td>
                    <td className="px-5 py-4">
                      {NEXT_STATUSES[booking.booking_status]?.length > 0 ? (
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) {
                              updateMutation.mutate({
                                id: booking.id,
                                newStatus: e.target.value,
                              });
                            }
                          }}
                          className="input py-1.5 text-xs w-36"
                        >
                          <option value="" disabled>
                            Change status
                          </option>
                          {NEXT_STATUSES[booking.booking_status].map((b) => (
                            <option key={b} value={b}>
                              {STATUS_LABELS[b]}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-slate-400 text-xs italic">
                          No Action
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
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

export default AdminBooking;
