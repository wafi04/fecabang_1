"use client";
import { useState } from "react";
import { useGetTransactions } from "@/_transactions/hooks/api";
import { AuthenticationLayout } from "@/shared/providers/authenticationLayout";
import { useDebounce } from "@/shared/hooks/use-debounce";

export default function CheckTransactionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debounce = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useGetTransactions({
    filters: {
      search: debounce,
      limit: "10",
      page: "1",
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <AuthenticationLayout>
      <main className="min-h-screen ">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Check Transaction
            </h1>
            <p className="text-gray-600">
              Search and view your transaction history
            </p>
          </div>

          {/* Search Form */}
          <div className=" rounded-lg p-6 mb-6">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Search Transactions
                  </label>
                  <input
                    id="search"
                    type="text"
                    placeholder="Enter Reference ID or Product Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="sm:self-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Searching...
                      </span>
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    Error loading transactions
                  </h3>
                  <p className="text-sm text-red-600 mt-1">
                    Please try again later or contact support if the problem
                    persists.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !data && (
            <div className=" rounded-lg shadow-sm ">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <svg
                    className="animate-spin h-6 w-6 text-blue-600"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-gray-600">Loading transactions...</span>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {data?.data?.data && data.data.data.length === 0 && !isLoading && (
            <div className=" rounded-lg shadow-sm  p-8">
              <div className="text-center">
                <svg
                  className="h-12 w-12 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No transactions found
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? `No transactions match your search for "${searchTerm}"`
                    : "No transactions available"}
                </p>
              </div>
            </div>
          )}

          {/* Results Table */}
          {data?.data?.data && data.data.data.length > 0 && (
            <div className=" rounded-lg shadow-sm  overflow-hidden">
              <div className="px-6 py-4 ">
                <h3 className="text-lg font-medium text-gray-900">
                  Transaction Results
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Found {data.data.data.length} transaction
                  {data.data.data.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" divide-y divide-gray-200">
                    {data.data.data.map((transaction, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.referenceId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {transaction.productName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-full border ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            {transaction.status
                              ? transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1).toLowerCase()
                              : "Unknown"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </AuthenticationLayout>
  );
}
