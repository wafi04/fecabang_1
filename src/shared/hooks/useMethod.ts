import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { API_RESPONSE } from "../types/response";
import { ResponseMethod } from "../types/method";

export function useGetMethodByType() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["methods-by-type"],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<ResponseMethod[]>>(
        `/method/type`
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
