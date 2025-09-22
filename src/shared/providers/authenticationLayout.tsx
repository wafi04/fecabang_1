"use client";
import { Navbar } from "@/components/layout/navbar";
import { WithChildren } from "../types/response";
import { Footer } from "@/components/layout/footer";
import { AuthInitProvider } from "./AuthProvider";
import { useGetWebSettings } from "../components/web/api/webSettings";

export function AuthenticationLayout({ children }: WithChildren) {
  const { data } = useGetWebSettings();
  const websettinggsData = data?.data;
  return (
    <AuthInitProvider>
      {websettinggsData && (
        <>
          <Navbar data={websettinggsData} />
          <main className="min-h-screen w-full h-full">
            {children}
            </main> 
          <Footer data={websettinggsData} />
        </>
      )}
    </AuthInitProvider>
  );
}
