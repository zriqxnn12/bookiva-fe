import { Search } from "lucide-react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Helmet>
        <title>BookIva - Book your service</title>

        <meta name="description" content="BookIva - HomePage" />
        <meta property="og:title" content="BookIva - HomePage" />
        <meta property="og:description" content="BookIva - HomePage" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28">
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
            <p className="text-blue-200 text-lg max-w-xl mb-8">
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

        <section className="relative overflow-hidden bg-slate-100">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14">
            <div className="flex items-center justify-center gap-4">
              <div className="px-3 py-2 border border-gray-300 rounded-lg">
                <p>Sports</p>
              </div>
              <div className="px-3 py-2 border border-gray-300 rounded-lg">
                <p>Sports</p>
              </div>
              <div className="px-3 py-2 border border-gray-300 rounded-lg">
                <p>Sports</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
