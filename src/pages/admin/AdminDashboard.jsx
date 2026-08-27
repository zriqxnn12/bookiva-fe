import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  DollarSign,
  Users2,
} from "lucide-react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../../services/AdminService";
import { formatCurrency, StatusBadge } from "../../helper/ui";
import { format } from "date-fns";

function AdminDashboard() {
  const { data } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => getDashboardStats(),
    refetchInterval: 30000,
  });

  const stats = data?.data?.stats;
  const recentBookings = data?.data?.recentBookings || [];

  const statCards = [
    {
      label: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: CalendarDays,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats?.totalRevenue?._sum?.amount || 0),
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "Pending",
      value: stats?.totalPending || 0,
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users2,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <>
      <Helmet>
        <title>BookIva - Admin Dashboard</title>

        <meta name="description" content="BookIva - Admin Dashboard" />
        <meta property="og:title" content="BookIva - Admin Dashboard" />
        <meta property="og:description" content="BookIva - Admin Dashboard" />
      </Helmet>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-800 mt-1 text-sm mb-8">
          Overview of your booking platform
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
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
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Bookings</h2>
            <Link
              to="/admin/bookings"
              className="text-blue-700 text-sm flex gap-1 items-center font-medium hover:text-blue-900"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    service
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    date
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    amount
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {booking.user.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {booking.user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {booking.service.name}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {format(new Date(booking.created_at), "MMM, d, yyyy")}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {formatCurrency(booking.total_amount)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={booking.booking_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
