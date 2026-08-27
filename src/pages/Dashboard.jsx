import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Clock,
  Plus,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBookings, getBookingStats } from "../services/BookingService";
import { format } from "date-fns";
import { formatCurrency, StatusBadge } from "../helper/ui";

const STATUS_TABS = [
  { value: "", label: "All" },
  { value: "WAITING_PAYMENT", label: "Waiting Payment" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("");
  const [page, setPage] = useState(1);

  const { data: statData } = useQuery({
    queryKey: ["booking-stats"],
    queryFn: () => getBookingStats(),
  });

  const confirmed = statData?.data?.confirmed;
  const upcoming = statData?.data?.upcoming;
  const completed = statData?.data?.completed;

  const { data: bookingsData } = useQuery({
    queryKey: ["my-bookings", activeTab, page],
    queryFn: () =>
      getBookings({ booking_status: activeTab || undefined, page, limit: 10 }),
  });

  const bookings = bookingsData?.data?.bookings || [];
  const pagination = bookingsData?.data?.pagination || null;

  return (
    <>
      <Helmet>
        <title>BookIva - Dashboard</title>

        <meta name="description" content="BookIva - Dashboard" />
        <meta property="og:title" content="BookIva - Dashboard" />
        <meta property="og:description" content="BookIva - Dashboard" />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Welcome back, {user?.name?.split(" ")[0]}
                  </h1>
                  <p className="text-slate-400 text-sm">{user?.email}</p>
                </div>
              </div>
            </div>
            <Link
              to="/services"
              className="btn-primary flex items-center gap-2 text-sm py-2.5"
            >
              <Plus size={15} /> New Booking
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              {
                label: "Confirmed",
                value: confirmed,
                icon: CheckCircle,
                color: "text-green-500",
                bg: "bg-green-50",
              },
              {
                label: "Upcoming",
                value: upcoming,
                icon: Clock,
                color: "text-blue-500",
                bg: "bg-blue-50",
              },
              {
                label: "Completed",
                value: completed,
                icon: CalendarDays,
                color: "text-slate-500",
                bg: "bg-slate-100",
              },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="card p-4 sm:p-5">
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center ${bg} mb-3`}
                >
                  <Icon size={18} className={color} />
                </div>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <p className="text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="card overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900 mb-4">My Bookings</h2>
              {/* status tab filter */}
              <div className="flex gap-1 overflow-x-auto pb-1">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setActiveTab(tab.value);
                      setPage(1);
                    }}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === tab.value ? "bg-blue-600 text-white" : "text-slate-800 hover:bg-slate-100"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="text-sm p-4 sm:p-5 text-slate-500 text-center">
                No bookings found.
              </div>
            ) : (
              <>
                {bookings.map((booking) => (
                  <Link
                    key={booking.id}
                    to={`/bookings/${booking.id}`}
                    className="flex items-start sm:items-center gap-4 p-4 sm:p-5 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-lg">
                      {booking.service.category?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate group-hover:text-blue-700 transition-colors">
                        {booking.service.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span>
                          {format(new Date(booking.booking_date), "EEE, MMM d")}
                        </span>
                        <span>.</span>
                        <span>{booking.time_slot.start_time}</span>
                        <span>.</span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(booking.total_amount)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={booking.booking_status} />
                      <ChevronRight
                        size={15}
                        className="text-slate-300 group-hover:text-slate-800 transition-colors"
                      />
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
          {pagination && pagination.totalPage > 1 && (
            <div className="p-4 border-t border-slate-200 flex justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="btn-secondary px-4 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="flex flex-row items-center justify-center">
                  <ArrowLeft size={11} className="mr-1" /> Prev
                </div>
              </button>
              <div className="flex gap-1">
                {[...Array(pagination.totalPage)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 text-sm font-medium rounded-xl transition-all 
                      ${
                        page === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white text-slate-800 border border-slate-200 hover:border-slate-400 hover:text-blue-600"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={page === pagination.totalPage}
                onClick={() => setPage((prev) => prev + 1)}
                className="btn-secondary px-4 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="flex flex-row items-center justify-center">
                  Next
                  <ArrowRight size={11} className="ml-1" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
