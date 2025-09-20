"use client";
import { useGetAllTransactions } from "@/_transactions/hooks/api";
import { FilterDashboard } from "@/shared/components/filter/filter";
import { PaginationComponents } from "@/shared/components/filter/pagination";
import { useState } from "react";
import { TableOrder } from "./table";
import { Loader2 } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading } = useGetAllTransactions({
    limit: currentLimit.toString(),
    page: currentPage.toString(),
    search: searchTerm,
    status: statusFilter,
  });

  // Handler untuk pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handler untuk limit change
  const handleLimitChange = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(1);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); 
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); 
  };

  return (
    <main className="p-6">
      <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 className="text-2xl font-bold">
          Data Transaksi  
        </h3>
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
          <FilterDashboard
            currentLimit={currentLimit}
            searchTerm={searchTerm}
            setCurrentLimit={handleLimitChange}
            setSearchTerm={handleSearchChange}
          />
          
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div className="mb-6">
          <TableOrder data={data?.data.data || []} />
        </div>
      )}

      {data?.data.meta && (
        <PaginationComponents
          onPageChange={handlePageChange}
          pagination={data?.data.meta}
        />
      )}
    </main>
  );
}