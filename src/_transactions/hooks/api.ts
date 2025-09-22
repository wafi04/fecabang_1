import { api } from "@/lib/axios";
import {
  API_RESPONSE,
  ApiPagination,
  FilterRequest,
} from "@/shared/types/response";
import {
  CreateTransactions,
  TransactionsAllData,
} from "@/shared/types/transaction";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface TransactionResponse {
  status: string;
  referenceId: string;
  productName: string;
  fee: number;
  methodName: string;
  no_tujuan: string;
  nickname: string;
}

export interface TransactionUserResponse {
  created_at: string;
  fee: number;
  id: number;
  payment_name: string;
  price: number;
  product_name: string;
  reference_id: string;
  status: string;
  total: number;
  tujuan: string;
  updated_at: string;
}

export function useGetAllTransactions(filters: FilterRequest) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.start_date) params.append("start_date", filters.start_date);
      if (filters?.end_date) params.append("end_date", filters.end_date);

      const data = await api.get<ApiPagination<TransactionsAllData[]>>(
        `/trxreseller?${params.toString()}`
      );
      return data.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useCreateTransactions() {
  return useMutation({
    mutationKey: ["transactions"],
    mutationFn: async (data: CreateTransactions) => {
      const validateData = {
        product_id: data.productId,
        id: data.ID,
        tujuan: data.noTujuan,
        payment_code: data.paymentMethod,
      };

      const req = await api.post<API_RESPONSE<TransactionResponse>>(
        "/trxreseller",
        validateData
      );
      return req.data;
    },
  });
}

export function useGetTransactions({ filters }: { filters?: FilterRequest }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("page", filters.page);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status) params.append("status", filters.status);

      const req = await api.get<ApiPagination<TransactionResponse[]>>(
        "/trxreseller?" + params.toString()
      );
      return req.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useGettransactionsResellerUser({
  filters,
}: {
  filters?: FilterRequest;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["order-users", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.limit) params.append("limit", filters.limit);
      if (filters?.page) params.append("offset", filters.page);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status) params.append("status", filters.status);

      const req = await api.get<ApiPagination<TransactionUserResponse[]>>(
        "/trxreseller/user?" + params.toString()
      );
      return req.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    data,
    isLoading,
    error,
  };
}
