import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Briefcase, Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/CategoryService";
import { useSearchParams } from "react-router-dom";
import { getServices } from "../services/ServiceService";
import { EmptyState } from "../helper/ui";
import ServiceCard from "../components/ServiceCard";

function ServicePage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const { data } = useQuery({
    queryKey: ["services", search, categoryId, page],
    queryFn: () => getServices({ search, categoryId, page, limit: 8 }),
    keepPreviousData: true,
  });

  const hasFilters = search || categoryId;

  const categories = categoryData?.data || [];
  const services = data?.data?.services || [];
  const pagination = data?.data?.pagination || null;

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearch("");
    setPage(1);
    setCategoryId("");
    setSearchParam({});
  };

  return (
    <>
      <Helmet>
        <title>BookIva - Book your service</title>

        <meta name="description" content="BookIva - Services" />
        <meta property="og:title" content="BookIva - Services" />
        <meta property="og:description" content="BookIva - Services" />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="capitalize text-2xl font-bold text-slate-900">
              featured services
            </h2>
            <p className="text-slate-800 mt-1 text-sm">
              Handpicked top-rated services
            </p>

            <form onChange={handleSearch} className="flex gap-3 mt-3 max-w-xl">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search services..."
                  className="input pl-10"
                />
              </div>
              <button type="submit" className="btn-primary text-sm px-5 py-2.5">
                Search
              </button>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="btn-secondary px-4 py-2.5 text-sm flex items-center gap-1"
                >
                  <X size={14} />
                  Clear
                </button>
              )}
            </form>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => {
                  setCategoryId("");
                  setPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${!categoryId ? "bg-blue-600 text-white" : "bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:text-blue-600"}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategoryId(cat.id);
                    setPage(1);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${categoryId === cat.id ? "bg-blue-600 text-white" : "bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:text-blue-600"}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {pagination && (
            <p className="text-sm text-slate-800 mb-5">
              {pagination.count} service{pagination.count !== 1 ? "s" : ""}{" "}
              found
            </p>
          )}
          {/* Render the EmptyState component if there are no services data */}
          {services.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No services found"
              description="Please try adjusting your search"
              action={
                <button onClick={clearFilters} className="btn-primary text-sm">
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {services.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}

          {pagination && pagination.totalPage > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
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

export default ServicePage;
