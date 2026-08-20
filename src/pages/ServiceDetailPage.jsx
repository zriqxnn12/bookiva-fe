import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getService } from "../services/ServiceService";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  Shield,
  Star,
} from "lucide-react";
import { formatCurrency } from "../helper/ui";

const SERVICE_IMAGES = {
  Sports:
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80",
  Beauty:
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Wellness:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
  Fitness:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
};

function ServiceDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getService(id),
  });

  const service = data?.data || null;

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

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/services/${id}/book`);
  };

  const imgUrl =
    SERVICE_IMAGES[service.category?.name] ||
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80";

  return (
    <>
      <Helmet>
        <title>BookIva - Service detail</title>

        <meta name="description" content="BookIva - Service detail" />
        <meta property="og:title" content="BookIva - Service detail" />
        <meta property="og:description" content="BookIva - Service detail" />
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

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="card overflow-hidden">
                <img
                  src={imgUrl}
                  alt={service.name}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h1 className="text-2xl font-bold text-slate-800">
                      {service.name}
                    </h1>
                    {service.rating && (
                      <div className="flex items-center gap-1 shrink-0">
                        <Star
                          size={16}
                          className="text-yellow-500 fill-yellow-500"
                        />
                        <span className="text-sm">
                          {Number(service.rating).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-slate-800 mb-5">
                    {service.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-blue-500" />
                        {service.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-blue-500" />
                      {service.duration} minutes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                        {service.category?.icon}
                      </span>
                      {service.category?.name}
                    </span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="card p-6">
                <h2 className="font-semibold text-slate-800 mb-4">
                  What's included?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Professional staff",
                    "Clean environment",
                    "Easy booking",
                    "Flexible scheduling",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-slate-800"
                    >
                      <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-green-500" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6 sticky top-24">
                <div className="mb-4">
                  <p className="text-sm text-slate-800">Starting from</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {formatCurrency(service.price)}
                  </p>
                  <p className="text-xs text-slate-800">
                    / {service.duration} min session
                  </p>
                </div>
                <button
                  onClick={handleBook}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3 mb-4"
                >
                  <Calendar size={16} />
                  Book now
                  <ArrowRight size={16} />
                </button>

                <div className="space-y-3 border-t border-slate-200 mt-4 pt-4">
                  <div className="flex items-center gap-2.5 text-sm text-slate-800">
                    <Shield size={14} className="text-green-500" />
                    Secure payment via Xendit
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-800">
                    <Clock size={14} className="text-blue-500" />
                    Free cancellation before session
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-800">
                    <Calendar size={14} className="text-blue-500" />
                    Instant booking confirmation
                  </div>
                </div>

                {!isAuthenticated && (
                  <p className="text-xs text-center text-slate-800 mt-4">
                    Please{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign in
                    </Link>{" "}
                    to book this service
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetailPage;
