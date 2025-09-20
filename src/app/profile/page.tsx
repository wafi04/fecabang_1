"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/shared/hooks/authStore";
import { AuthenticationLayout } from "@/shared/providers/authenticationLayout";
import { Activity, Calendar, Mail, Monitor, Shield, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "reseller":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "user":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <AuthenticationLayout>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
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
                      <Badge
                        variant="secondary"
                        className={getRoleColor(user.role_name)}
                      >
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
                  <Badge
                    variant="outline"
                    className={getRoleColor(user.role_name)}
                  >
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
        </div>
      </div>
    </AuthenticationLayout>
  );
}
