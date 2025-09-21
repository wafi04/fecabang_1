"use client";
import { useGetWebSettings } from "@/shared/components/web/api/webSettings";
import { FormWebSettings } from "@/shared/components/web/components/form";

export default function Page() {
  const { data } = useGetWebSettings();
  return (
    <main className="p-6">
      <FormWebSettings initialData={data?.data} />
    </main>
  );
}
