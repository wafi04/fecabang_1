"use client";
import { PaginationComponents } from "@/shared/components/filter/pagination";
import { TableProducts } from "./_components/table";
import { useGetResellerPricing } from "./hooks/useResellerPricing";
import { useState, useCallback, useEffect } from "react";

interface Filters {
  page: number;
  limit: number;
  search?: string;
}

export default function DashboardProduct() {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
    search: undefined,
  });

  // Debounced search to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search as string);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilters((prev) => ({ ...prev, page: 1 }));
    }
  }, [debouncedSearch,filters.search]);

  const { data, isLoading } = useGetResellerPricing({
    page: filters.page.toString(),
    limit: filters.limit.toString(),
    search: debouncedSearch,
  });

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setFilters((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <main className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 border-t"></div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const products = data?.data?.data || [];
  const meta = data?.data?.meta;

  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produk Reseller</h1>
          <p className="text-sm text-gray-600 mt-1">
            Kelola Harga produk Reseller
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className=" p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <label htmlFor="search" className="sr-only">
              Cari produk
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Cari nama produk..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Items per page */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="limit"
              className="text-sm font-medium text-gray-700"
            >
              Tampilkan:
            </label>
            <select
              id="limit"
              value={filters.limit}
              onChange={(e) => handleLimitChange(parseInt(e.target.value))}
              className="block w-20 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-700">item</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        {products.length > 0 ? (
          <TableProducts products={products} />
        ) : (
          <div className="px-6 py-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m6 0h6m-6 6v6m0-6h6m-6 0V6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filters.search
                ? "Produk tidak ditemukan"
                : "Tidak ada data produk"}
            </h3>
            <p className="text-gray-500 mb-6">
              {filters.search
                ? `Tidak ada produk yang cocok dengan "${filters.search}"`
                : "Belum ada data produk reseller yang tersedia."}
            </p>
            {filters.search && (
              <button
                onClick={() => handleSearchChange("")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Hapus Filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {meta && products.length > 0 && (
        <div className="flex justify-center">
          <PaginationComponents
            onPageChange={handlePageChange}
            pagination={meta}
          />
        </div>
      )}
    </main>
  );
}
