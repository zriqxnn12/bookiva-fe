import { ArrowRight, Clock, Search, Shield, Star, Zap } from "lucide-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../services/ServiceService";
import ServiceCard from "../components/ServiceCard";

function HomePage() {
  const [search, setSearch] = useState("");

  const features = [
    {
      icon: Zap,
      title: "Instant Booking",
      desc: "Book any service in under 60 seconds with real time availability",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      desc: "All payments processed securely via Xendit payment gateway",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      desc: "Choose from multiple slots that fit your schedule",
    },
    {
      icon: Star,
      title: "Verified Services",
      desc: "All service providers are vetted and highly rated by our customers",
    },
  ];

  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices({ limit: 4 }),
  });

  const services = data?.data?.services || [];

  return (
    <>
      <Helmet>
        <title>BookIva - Book your service</title>

        <meta name="description" content="BookIva - HomePage" />
        <meta property="og:title" content="BookIva - HomePage" />
        <meta property="og:description" content="BookIva - HomePage" />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-slate-50">
        {/* hero banner */}
        <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 font-bold text-sm">
              <span className="rounded-full h-2 w-2 bg-orange-500"></span> Book
              service instantly, no hassie
            </div>
            <h1 className="capitalize text-white font-bold text-4xl lg:text-6xl mt-3 mb-3">
              Find & Book the{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                best services
              </span>{" "}
              near you
            </h1>
            <p className="text-blue-200 max-w-xl mb-8">
              From tennis court to beauty salons, discover and book premium
              services with real-time availability and instant confirmation.
            </p>

            <form action="#" className="flex gap-2 max-w-lg">
              <div className="flex-1 relative">
                <Search
                  size={20}
                  className="absolute left-3.5 top-3 text-slate-300"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search services..."
                  className="w-full bg-slate-100 py-3 pl-12 pr-4 text-sm rounded-xl text-slate-500 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg"
                />
              </div>
              <button className="px-6 py-3 font-semibold bg-orange-500 rounded-xl text-sm hover:bg-orange-600 transition-all shadow-lg">
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm mt-0.5 text-blue-200 capitalize">
                  active services
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">2,400+</p>
                <p className="text-sm mt-0.5 text-blue-200 capitalize">
                  happy customers
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">12,000+</p>
                <p className="text-sm mt-0.5 text-blue-200 capitalize">
                  bookings made
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* button filter section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { emoji: "🎾", label: "Sports" },
              { emoji: "💇‍♀️", label: "Beauty" },
              { emoji: "💆", label: "Wellness" },
              { emoji: "🏋️‍♀️", label: "Fitness" },
            ].map(({ emoji, label }) => (
              <Link
                to={`/services?category=${label.toLowerCase()}`}
                key={label}
                className="flex items-center font-medium gap-2 rounded-xl px-5 py-2 bg-white border border-slate-500 hover:border-slate-800 hover:bg-slate-300 transition-all text-sm text-slate-700 hover:shadow-sm"
              >
                <span className="text-lg">{emoji}</span>
                {label}
              </Link>
            ))}
            <Link
              to="/services"
              className="bg-blue-800 px-5 py-2 font-medium rounded-xl text-white flex items-center gap-3 text-sm hover:bg-blue-900 transition-all hover:shadow-sm"
            >
              All services <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* featured services section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="capitalize text-2xl font-bold text-slate-900">
                featured services
              </h2>
              <p className="text-slate-800 mt-1 text-sm">
                Handpicked top-rated services
              </p>
            </div>
            <Link
              to="/services"
              className="text-blue-700 text-sm flex gap-1 items-center font-medium hover:text-blue-900"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* why section */}
        <section className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="font-bold text-2xl text-slate-900">
                Why Choose BookIva?
              </h1>
              <p className="text-slate-800">
                Everything you need for a seamless booking experience
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl mx-auto mb-4">
                    <Icon size={22} className="text-blue-700" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white text-center overflow-hidden">
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-50">
                Ready to book your next service?
              </h2>
              <p className="text-blue-200 max-w-lg mb-8 mx-auto">
                Join thousands of happy customers who book their favorite
                services through BookIva.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/register"
                  className="bg-white text-blue-900 px-6 py-3 font-semibold rounded-xl hover:text-blue-950 transition-all active:scale-95 shadow-lg"
                >
                  Create free account
                </Link>
                <Link
                  to="/services"
                  className="border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
                >
                  Browse services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-sm">
                © 2026 BookIva. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-slate-400">
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default HomePage;
