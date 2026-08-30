import { Clock, MapPin, Star } from "lucide-react";
import React from "react";
import { formatCurrency } from "../helper/ui";
import { Link } from "react-router-dom";

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

function ServiceCard({ service, isActive }) {
  const imgUrl =
    SERVICE_IMAGES[service.category?.name] ||
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80";

  return (
    <div className="card group overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="relative overflow-hidden">
        <img
          src={imgUrl}
          alt={service.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute left-3 top-3">
          <span className="bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm text-xs text-slate-800">
            {service.category?.icon} {service.category?.name}
          </span>
        </div>
        {service.rating && (
          <div className="absolute right-3 top-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
            <Star size={11} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-slate-800 font-bold">
              {Number(service.rating).toFixed(1)}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors line-clamp-1">
          {service.name}
        </h3>
        <p className="text-sm text-slate-400 mb-3 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
        <div className="flex items-center justify-between gap-3 text-xs text-slate-400 mb-4">
          {service.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {service.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {service.duration} min
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs text-slate-400">from</span>
            <p className="font-bold text-blue-700">
              {formatCurrency(service.price)}
            </p>
          </div>
          {!isActive === true ? (
            <button
              disabled
              className="flex items-center gap-1.5 opacity-45 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all active:scale-95 shadow-sm hover:shadow-md cursor-not-allowed"
            >
              Deactivated
            </button>
          ) : (
            <Link
              to={`/services/${service.id}`}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all active:scale-95 shadow-sm hover:shadow-md"
            >
              Book now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
