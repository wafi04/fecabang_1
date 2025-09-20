"use client";
import { WithChildren } from "@/shared/types/response";
import { DashboardSidebar } from "./_components/layout";

export default function DashboardLayout({ children }: WithChildren) {
  return (
    <div className="flex h-screen relative ">
      {/* Sidebar fixed di kiri */}
      <DashboardSidebar />

      {/* Konten scrollable */}
      <main className="flex-1 pl-64">{children}</main>
    </div>
  );
}
