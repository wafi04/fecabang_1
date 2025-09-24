"use client";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { useGetWebSettings } from "../components/web/api/webSettings";
import { WithChildren } from "../types/response";

export function AuthenticationLayout({ children }: WithChildren) {
  const { data } = useGetWebSettings();
  const websettinggsData = data?.data;
  return (
    <>
      {websettinggsData && (
        <>
          <Navbar data={websettinggsData} />
          <main className="min-h-screen w-full h-full">
            {children}
            </main> 
          <Footer data={websettinggsData} />
        </>
      )}
    </>
  );
}
