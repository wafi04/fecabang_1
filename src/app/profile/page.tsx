"use client";

import { useGettransactionsResellerUser } from "@/_transactions/hooks/api";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PaginationComponents } from "@/shared/components/filter/pagination";
import { useAuthStore } from "@/shared/hooks/authStore";
import { AuthenticationLayout } from "@/shared/providers/authenticationLayout";
import { formatDate } from "@/shared/utils/format";
import {
  Activity,
  Calendar,
  Mail,
  Monitor,
  Search,
  Shield,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TableTransactionsUser } from "./table";
import { useDebounce } from "@/shared/hooks/use-debounce";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, error } = useGettransactionsResellerUser({
    filters: {
      limit: "10",
      page: currentPage.toString(),
      search: debouncedSearch,
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  // Handle initial loading (saat pertama kali load atau tidak ada user)
  if (!user) {
    return (
      <AuthenticationLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </AuthenticationLayout>
    );
  }

  return (
    <AuthenticationLayout>
      <div className="container mx-auto py-8 max-w-screen-2xl">
        <div className="grid gap-6">
          {/* Main Profile Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle className="text-2xl">{user.username}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {user.email}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">
                        <Shield className="w-3 h-3 mr-1" />
                        {user.role_name.charAt(0).toUpperCase() +
                          user.role_name.slice(1)}
                      </Badge>
                      <Badge
                        variant={user.is_active ? "default" : "destructive"}
                        className="ml-2"
                      >
                        <Activity className="w-3 h-3 mr-1" />
                        {user.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Username</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {user.username}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Role</span>
                  </div>
                  <Badge variant="outline">
                    {user.role_name.charAt(0).toUpperCase() +
                      user.role_name.slice(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Activity Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Last Activity</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(user.last_activity)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">User Agent</span>
                  </div>
                  <div className="text-right max-w-xs">
                    <span className="text-xs text-muted-foreground break-all">
                      {user.user_agent}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Section untuk Transactions */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    View and search through your recent transactions
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  {search && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {data && <TableTransactionsUser data={data?.data.data} />}

              {/* Pagination */}
              {data?.data.meta && (
                <div className="mt-6">
                  <PaginationComponents
                    onPageChange={handlePageChange}
                    pagination={data.data.meta}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticationLayout>
  );
}
