"use client";
import { useGetResellerPricing } from "@/app/dashboard/products/hooks/useResellerPricing";
import { AuthenticationLayout } from "@/shared/providers/authenticationLayout";
import { useParams } from "next/navigation";
import {
  BannerOrder,
  HeaderOrder,
  OrderInformation,
} from "./_components/headerOrder";
import { ProductsOrder } from "./_components/products";
import { MethodSection } from "./_components/method";
import { PlaceHolderInput } from "./_components/placeholderInput";
import { Cart } from "./_components/cart";

export default function OrderLayout() {
  const { slug } = useParams();
  const limit = 100;
  const page = 1;
  const { data } = useGetResellerPricing({
    brand: slug as string,
    limit: limit.toString(),
    status: "active",
    page: page.toString(),
  });

  const dataCategory = data?.data.data[0];

  if (!dataCategory) {
    return (
      <AuthenticationLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading...</p>
        </div>
      </AuthenticationLayout>
    );
  }

  return (
    <AuthenticationLayout>
      <main className="relative bg-background space-y-10">
        <section>
          <BannerOrder image={dataCategory?.subCategoryBanner} />
        </section>

        {/* Content area */}
        <section className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Header & Info */}
            <div className="space-y-4 col-span-1">
              <HeaderOrder
                brand={dataCategory?.brand || ""}
                name={dataCategory.subCategoryName || ""}
                subName={dataCategory.subCategoryName || ""}
                thumbnail={dataCategory.subCategoryThumbnail || ""}
              />
              <OrderInformation
                inf={dataCategory.subCategoryInformation as string}
              />
              <Cart />
            </div>

            <div className=" md:col-span-2 lg:sticky lg:top-4 lg:h-fit space-y-5">
              <PlaceHolderInput brand={slug as string} />
              <ProductsOrder products={data.data.data} />
              <MethodSection />
            </div>
          </div>
        </section>
      </main>
    </AuthenticationLayout>
  );
}
