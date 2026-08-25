import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getService, getSlots } from "../services/ServiceService";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatCurrency } from "../helper/ui";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getDay,
  isBefore,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { createBooking } from "../services/BookingService";
import toast from "react-hot-toast";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function BookingPage() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notes, setNotes] = useState("");
  const [calMonth, setCalMonth] = useState(new Date());
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getService(id),
  });

  const service = data?.data || null;

  // get available slots for the selected date
  const { data: slotsData } = useQuery({
    queryKey: ["slots", id, selectedDate],
    queryFn: () => getSlots(id, format(selectedDate, "yyyy-MM-dd")),
    enabled: !!selectedDate,
  });

  const slots = slotsData?.data || [];

  const bookMutation = useMutation({
    mutationFn: (data) => createBooking(data),
    onSuccess: (res) => {
      const bookingId = res.data.id;
      toast.success("Booking created! Proceeding to payment.");
      navigate(`/bookings/${bookingId}`);
    },
    onError: (err) => toast.error(err.response?.message || "Booking Failed"),
  });

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="text-center py-32">
          <p className="text-slate-800">No service found</p>
        </div>
      </div>
    );
  }

  const monthStart = startOfMonth(calMonth);
  const monthEnd = endOfMonth(calMonth);
  const calDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = getDay(monthStart);
  const today = startOfDay(new Date());

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) return;
    bookMutation.mutate({
      service_id: id,
      slot_id: selectedSlot.id,
      booking_date: format(selectedDate, "yyyy-MM-dd"),
      note: notes,
    });
  };

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
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-slate-800 hover:text-slate-900 transition-colors mb-5"
          >
            <ArrowLeft size={15} />
            Back to services
          </Link>

          <h1 className="text-2xl font-bold text-slate-800 mb-1">
            Book {service?.name}
          </h1>
          <p className="text-slate-800 text-sm mb-6">
            {formatCurrency(service?.price)} - {service?.duration} minutes
          </p>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-5">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Calendar size={16} className="text-blue-600" />
                    Select a date
                  </h2>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCalMonth((prev) => subMonths(prev, 1))}
                      className="p-1.5 rounded-lg hover:bg-slate-100"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm text-slate-800 font-semibold w-32 text-center">
                      {format(calMonth, "MMMM yyyy")}
                    </span>
                    <button
                      onClick={() => setCalMonth((prev) => addMonths(prev, 1))}
                      className="p-1.5 rounded-lg hover:bg-slate-100"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                {/* calendar */}
                <div className="grid grid-cols-7 gap-1.5 mb-2">
                  {DAY_LABELS.map((d) => (
                    <div
                      key={d}
                      className="text-center text-xs font-semibold text-slate-400 py-1"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {[...Array(startPadding)].map((_, i) => (
                    <div key={`pad-${i}`} />
                  ))}
                  {calDays.map((day) => {
                    const isPast = isBefore(startOfDay(day), today);
                    const isSelected =
                      selectedDate &&
                      format(day, "yyyy-MM-dd") ===
                        format(selectedDate, "yyyy-MM-dd");

                    return (
                      <button
                        key={day.toString()}
                        disabled={isPast}
                        onClick={() => {
                          setSelectedDate(day);
                          setSelectedSlot(null);
                        }}
                        className={`aspect-square rounded-xl text-sm font-medium transition-all flex items-center justify-center
                                ${isPast ? "text-slate-300 cursor-not-allowed" : isSelected ? "bg-blue-600 text-white shadow-sm" : "hover:bg-blue-50 text-slate-800 hover:text-blue-700"}`}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <div className="card p-5">
                  <h2 className="flex items-center gap-2 text-slate-800 font-semibold mb-4">
                    Available Times - {format(selectedDate, "EEE, MMM d")}
                  </h2>
                  {slots.length === 0 ? (
                    <div className="text-center text-slate-500 text-sm">
                      No time slots available
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all border 
                            ${
                              !slot.available
                                ? "bg-slate-50 border-slate-300 text-slate-400 cursor-not-allowed line-through"
                                : selectedSlot?.id === slot.id
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-slate-200 text-slate-800 hover:border-blue-500 hover:text-blue-600 bg-white"
                            }`}
                        >
                          {slot.start_time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {selectedDate && slots.length > 0 && (
                <div className="card p-5">
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Special request (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Any special requirements or notes for the services provider..."
                    className="input resize-none"
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="card p-6 sticky top-24">
                <h2 className="font-semibold text-slate-800 mb-4">
                  Booking summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-800">
                    <span>Service</span>
                    <span className="font-medium max-w-32 truncate">
                      {service?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-800">
                    <span>Duration</span>
                    <span className="font-medium">{service?.duration} min</span>
                  </div>
                  {selectedDate && (
                    <div className="flex justify-between text-slate-800">
                      <span>Date</span>
                      <span className="font-medium">
                        {format(selectedDate, "dd/MM/yyyy")}
                      </span>
                    </div>
                  )}
                  {selectedSlot && (
                    <div className="flex justify-between text-slate-800">
                      <span>Time</span>
                      <span className="font-medium">
                        {selectedSlot.start_time} - {selectedSlot.end_time}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between text-slate-800">
                    <span>Total</span>
                    <span className="text-blue-700 text-lg font-bold">
                      {formatCurrency(service?.price)}
                    </span>
                  </div>
                </div>
                {!selectedDate || !selectedSlot ? (
                  <div className="mt-4 flex items-center text-xs p-2 gap-2 text-slate-400 bg-slate-100 rounded-xl">
                    <AlertCircle size={14} className="shrink-0" />
                    Please select date and time slot to continue
                  </div>
                ) : (
                  <button
                    onClick={handleBook}
                    className="btn-primary flex items-center justify-center mt-4 w-full py-3"
                  >
                    Confirm & pay
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingPage;
