// src/hooks/useAuthQuery.ts
import { api } from "@/lib/axios";
import { API_RESPONSE } from "@/shared/types/response";
import { User } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  const response = await api.get<API_RESPONSE<User>>("/user/profile");
  return response.data.data;
};

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: fetchUser,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
};
