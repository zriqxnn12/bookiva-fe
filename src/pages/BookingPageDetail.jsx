import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { cancelBooking, getBooking } from "../services/BookingService";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  CreditCard,
  ExternalLink,
  XCircle,
} from "lucide-react";
import { formatCurrency, StatusBadge } from "../helper/ui";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { createPayment } from "../services/PaymentService";

const statusIcon = {
  CONFIRMED: <CheckCircle size={20} className="text-green-500" />,
  CANCELLED: <XCircle size={20} className="text-red-500" />,
  COMPLETED: <CheckCircle size={20} className="text-slate-300" />,
  WAITING_PAYMENT: <AlertCircle size={20} className="text-yellow-500" />,
  PENDING: <Clock size={20} className="text-blue-500" />,
};

function BookingPageDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const queryClient = new QueryClient();

  const { data, refetch } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  const booking = data?.data || null;

  useEffect(() => {
    const result = searchParams.get("payment");

    if (result === "success") {
      toast.success("Payment confirmed! Your booking is now confirmed.");
      refetch();
    } else if (result === "failed") {
      toast.error("Payment failed. Please try again.");
    }
  }, []);

  const payMutation = useMutation({
    mutationFn: () => createPayment(id),
    onSuccess: (res) => {
      const url = res.data.xendit_payment_url;

      if (url) window.open(url, "_blank");
      else toast.error("Payment url is not available.");
      queryClient.invalidateQueries(["booking", id]);
    },
    onError: (err) => toast.error(err.response?.message || "Payment failed"),
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelBooking(id),
    onSuccess: () => {
      toast.success("Booking cancelled");
      queryClient.invalidateQueries(["booking", id]);
    },
    onError: (err) => toast.error(err.response?.message || "Cancel failed"),
  });

  const canPay = booking?.booking_status === "WAITING_PAYMENT";
  const canCancel = !["COMPLETED", "CANCELLED"].includes(
    booking?.booking_status,
  );

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="text-center py-32">
          <p className="text-slate-800">No booking found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>BookIva - Booking</title>

        <meta name="description" content="BookIva - Booking" />
        <meta property="og:title" content="BookIva - Booking" />
        <meta property="og:description" content="BookIva - Booking" />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-800 hover:text-slate-900 transition-colors mb-5"
          >
            <ArrowLeft size={15} />
            Back to dashboard
          </Link>

          <div
            className={`card p-5 flex items-center mb-5 gap-3 ${
              booking.booking_status === "CONFIRMED"
                ? "bg-green-50 border-green-200"
                : booking.booking_status === "CANCELLED"
                  ? "bg-red-50 border-red-200"
                  : booking.booking_status === "WAITING_PAYMENT"
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-blue-50 border-blue-200"
            }`}
          >
            {statusIcon[booking.booking_status]}
            <div>
              <p className="font-semibold text-slate-800">
                {booking.booking_status === "WAITING_PAYMENT" &&
                  "Payment Required"}
                {booking.booking_status === "PENDING" &&
                  "Waiting for confirmation"}
                {booking.booking_status === "CONFIRMED" && "Booking Confirmed!"}
                {booking.booking_status === "COMPLETED" && "Booking Confirmed"}
                {booking.booking_status === "CANCELLED" && "Booking Cancelled"}
              </p>
              <p className="text-sm text-slate-800">
                {booking.booking_status === "WAITING_PAYMENT" &&
                  "Complete your payment to continue booking."}
                {booking.booking_status === "PENDING" &&
                  "Your payment being processed."}
                {booking.booking_status === "CONFIRMED" &&
                  "Your booking has been confirmed, see you soon!"}
                {booking.booking_status === "COMPLETED" &&
                  "Thank you for using our service."}
                {booking.booking_status === "CANCELLED" &&
                  "This booking has been cancelled."}
              </p>
            </div>
            <div className="ml-auto">
              <StatusBadge status={booking.booking_status} />
            </div>
          </div>

          <div className="card p-6 mb-5">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-semibold text-slate-800">Booking Details</h1>
              <span className="text-xs text-slate-400 font-mono">
                #{booking.id.slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Service</p>
                <p className="font-medium text-slate-800">
                  {booking.service.name}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Category</p>
                <p className="font-medium text-slate-800">
                  {booking.service.category?.icon}{" "}
                  {booking.service.category?.name}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Date</p>
                <p className="font-medium text-slate-800">
                  {format(new Date(booking.booking_date), "EEE, MMM d, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Time</p>
                <p className="font-medium text-slate-800">
                  {booking.time_slot.start_time} - {booking.time_slot.end_time}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Duration</p>
                <p className="font-medium text-slate-800">
                  {booking.service.duration}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Location</p>
                <p className="font-medium text-slate-800">
                  {booking.service.location || "-"}
                </p>
              </div>
              {booking.note && (
                <div className="col-span-2">
                  <p className="text-slate-400 text-xs mb-0.5">Note</p>
                  <p className="font-medium text-slate-800">{booking.note}</p>
                </div>
              )}
              <div className="col-span-2 border-t border-slate-200 pt-4 flex justify-between">
                <span className="text-slate-800 font-semibold">
                  Total Amount
                </span>
                <span className="font-bold text-blue-700 text-base">
                  {formatCurrency(booking.total_amount)}
                </span>
              </div>
            </div>
          </div>

          {booking.payment && (
            <div className="card p-6 mb-5">
              <h2 className="font-semibold text-slate-800 mb-4">Payment</h2>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-800">
                    {booking.payment.payment_method}
                  </span>
                </div>
                <StatusBadge status={booking.payment.status} />
              </div>
              {booking.payment.xendit_payment_url &&
                booking.payment.status === "UNPAID" && (
                  <a
                    href={booking.payment.xendit_payment_url}
                    target="_blank"
                    rel="noreferer"
                    className="mt-4 flex items-center justify-center gap-2 btn-primary w-full py-2.5"
                  >
                    <ExternalLink size={14} /> Open Payment Page
                  </a>
                )}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            {canPay && (
              <button
                onClick={() => payMutation.mutate()}
                className="btn-primary flex items-center justify-center gap-2 py-3 flex-1"
              >
                <CreditCard size={16} /> Pay Now
              </button>
            )}
            {canCancel && (
              <button
                onClick={() => cancelMutation.mutate()}
                className="btn-secondary flex items-center justify-center gap-2 py-3 flex-1 sm:flex-none text-red-500 border-red-300 hover:bg-red-600 hover:text-white transition-colors"
              >
                <XCircle size={16} /> Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingPageDetail;
