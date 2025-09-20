"use client"
import Banner from "@/shared/components/banner/components/banner";
import { AuthenticationLayout } from "@/shared/providers/authenticationLayout";
import { SectionSubCategory } from "./_components/sectionSubCategoryCards";

export default function Home() {
  return (
    <AuthenticationLayout>
      <main className="relative max-w-7xl flex flex-col space-y-10 w-full items-center  container">
        <Banner />
        <SectionSubCategory />
      </main>
    </AuthenticationLayout>
  );
}
