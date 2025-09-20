import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { FormFieldsData } from "../types/form-fields";
import { API_RESPONSE } from "../types/response";

export function useGetFormFields(brand: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["form-fields"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<FormFieldsData[]>>(
        `/form-fields/brand/${brand}`
      );
      return req.data;
    },
    staleTime: 24 * 60 * 1000,
    gcTime: 24 * 60 * 1000,
  });
  return {
    data,
    isLoading,
    error,
  };
}
