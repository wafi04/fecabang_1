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
import { useState } from "react";

export default function OrderLayout() {
  const { slug } = useParams();
  const [limit] = useState<number>(100);
  const page = 1;
  const { data, isLoading } = useGetResellerPricing({
    brand: slug as string,
    limit: limit.toString(),
    status: "active",
    page: page.toString(),
  });

  const dataCategory = data?.data?.data?.[0];

  if (isLoading) {
    return (
      <AuthenticationLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AuthenticationLayout>
    );
  }

  if (!dataCategory) {
    return (
      <AuthenticationLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <p className="text-gray-500">Category not found</p>
            <button 
              onClick={() => window.history.back()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Go Back
            </button>
          </div>
        </div>
      </AuthenticationLayout>
    );
  }

  return (
    <AuthenticationLayout>
      <main className="relative bg-background min-h-screen">
        {/* Banner Section */}
        <section className="w-full">
          <BannerOrder image={dataCategory.categoryBanner} />
        </section>

        {/* Content area with proper responsive layout */}
        <section className="container mx-auto p-4 mt-5">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <HeaderOrder
              brand={dataCategory.brand || ""}
              name={dataCategory.categoryName || ""}
              subName={dataCategory.categoryName || ""}
              thumbnail={dataCategory.categoryThumbnail || ""}
            />

            <OrderInformation
              inf={dataCategory.categoryInformation as string}
            />

            <PlaceHolderInput 
              brand={slug as string} 
              isCheckNickName={dataCategory.isCheckNickname} 
            />

            <ProductsOrder products={data.data.data} />

            <MethodSection />

            {/* Cart di bawah pada mobile */}
            <div className="sticky bottom-0 bg-background border-t pt-4 -mx-4 px-4">
              <Cart />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-8">
            {/* Left Column - Info Only (No Cart) */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-4 space-y-4">
                <HeaderOrder
                  brand={dataCategory.brand || ""}
                  name={dataCategory.categoryName || ""}
                  subName={dataCategory.categoryName || ""}
                  thumbnail={dataCategory.categoryThumbnail || ""}
                />

                <OrderInformation
                  inf={dataCategory.categoryInformation as string}
                />
              </div>
            </div>

            {/* Middle Column - Main Content */}
            <div className="lg:col-span-5 xl:col-span-6 space-y-6">
              <PlaceHolderInput 
                brand={slug as string} 
                isCheckNickName={dataCategory.isCheckNickname} 
              />

              <ProductsOrder products={data.data.data} />

              <MethodSection />
            </div>

            {/* Right Column - Sticky Cart */}
            <div className="lg:col-span-3 xl:col-span-3">
              <div className="sticky top-4">
                <Cart />
              </div>
            </div>
          </div>
        </section>
      </main>
    </AuthenticationLayout>
  );
}