import { api } from "@/lib/axios";
import { ProductReseller, UpdateProductReseller } from "@/shared/types/product";
import { ApiPagination, FilterRequest } from "@/shared/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetResellerPricing(filters?: FilterRequest) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reseller-pricing", filters],
    queryFn: async ({ queryKey }) => {
      const [, filterParams] = queryKey as [string, FilterRequest | undefined];

      const searchParams = new URLSearchParams();

      if (filterParams?.limit) {
        searchParams.set("limit", filterParams.limit.toString());
      }
      if (filterParams?.search && filterParams.search.trim()) {
        searchParams.set("search", filterParams.search.trim());
      }
      if (filterParams?.page) {
        searchParams.set("page", filterParams.page.toString());
      }
      if (filterParams?.status) {
        searchParams.set("status", filterParams.status);
      }
      if (filterParams?.brand) {
        searchParams.set("brand", filterParams.brand);
      }

      try {
        const response = await api.get<ApiPagination<ProductReseller[]>>(
          `/reseller/product?${searchParams.toString()}`
        );
        console.log(response)
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount) => {
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    data,
    isLoading,
    refetch,
  };
}

export function useUpdateResellerPricing() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["update-reseller-product"],
    mutationFn: async (data: UpdateProductReseller) => {
      const req = await api.patch(`/reseller/product/${data.id}`, data);
      console.log(req)
      return req.data;
    },
    onSuccess: () => {
      toast.success("update Successfulyy");
      qc.invalidateQueries({
        queryKey: ["reseller-pricing", { limit: "10", page: "1" }],
      });
    },
  });
}
