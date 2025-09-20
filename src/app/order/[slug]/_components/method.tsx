"use client";
import { cn } from "@/lib/utils";
import { useOrder } from "@/shared/hooks/formOrder";
import { useGetMethodByType } from "@/shared/hooks/useMethod";
import { calculateFee } from "@/shared/utils/calculateFee";
import { FormatCurrency } from "@/shared/utils/format";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export function MethodSection() {
  const { data } = useGetMethodByType();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const { selectedProduct,selectedMethod, setSelectedMethod } = useOrder();

  const handleGroupToggle = (groupType: string) => {
    if (!selectedProduct) {
      toast.error("Pilih Product Terlebih Dahulu");
      return;
    }
    setExpandedGroup(expandedGroup === groupType ? null : groupType);
  };



  return (
    <section className="relative scroll-mt-20 rounded-xl bg-card border p-4 shadow-sm md:scroll-mt-[7.5rem]">
      <h3 className="text-xl font-semibold text-foreground mb-4">
        Pilih Metode Pembayaran
      </h3>
      <div className="space-y-3">
        {data?.data?.map((group) => (
          <div
            key={group.type}
            className="rounded-lg bg-card border overflow-hidden"
          >
            {/* Header dengan preview metode */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleGroupToggle(group.type);
              }}
              className="flex w-full items-center justify-between transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-full justify-between flex bg-primary text-primary-foreground border-b py-3 px-4">
                  <h3 className="text-sm font-semibold">
                    {group.type.toUpperCase()}
                  </h3>
                  {expandedGroup === group.type ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </div>
            </button>

            {/* Preview methods (ketika collapsed) */}
            {expandedGroup !== group.type && (
              <div className="flex gap-3 justify-end w-full p-4 items-end">
                {group.methods?.slice(0, 4).map((method) => (
                  <div
                    key={method.id}
                    className="relative h-6 w-20 flex-shrink-0 rounded-md overflow-hidden"
                  >
                    <Image
                      src={method.image}
                      alt={method.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {group.methods && group.methods.length > 4 && (
                  <div className="text-xs text-muted-foreground">
                    +{group.methods.length - 4} lainnya
                  </div>
                )}
              </div>
            )}

            {/* Expanded methods */}
            {expandedGroup === group.type && (
              <div className="border-t bg-muted/30 p-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {group.methods?.map((method) => {
                    // Handle empty calculation_type
                    let calculationType = method.calculation_type;
                    if (
                      !calculationType ||
                      calculationType === ("" as string)
                    ) {
                      if (
                        (method.fee_amount === 0 || !method.fee_amount) &&
                        (method.fee_percentage === 0 || !method.fee_percentage)
                      ) {
                        calculationType = "fixed";
                      } else if (method.fee_amount > 0) {
                        calculationType = "fixed";
                      } else if (method.fee_percentage > 0) {
                        calculationType = "percentage";
                      } else {
                        calculationType = "fixed";
                      }
                    }

                    const feeData = {
                      fixed: Number(method.fee_amount) || 0,
                      percentage: Number(method.fee_percentage) || 0,
                    };
                    const productPrice = selectedProduct?.price || 0;
                    const fee = calculateFee(
                      selectedProduct?.price || 0,
                      feeData,
                      calculationType as "fixed" | "percentage" | "hybrid"
                    );

                    const total = productPrice + fee;
                    const isSelected = selectedMethod?.code === method.code;

                    return (
                      <button
                        key={method.id}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedMethod({
                            code : method.code,
                            fee : {
                              amount: feeData.fixed,
                              percentage: feeData.percentage,
                              type: calculationType as
                                | "fixed"
                                | "percentage"
                                | "hybrid",
                            },
                            name : method.name,
                            total
                          })
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg border p-3 transition-all hover:shadow-sm",
                          isSelected
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-8 flex-shrink-0 rounded  overflow-hidden">
                            <Image
                              src={method.image}
                              alt={method.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {method.name}
                          </span>
                        </div>

                        {productPrice > 0 && (
                           
                              
                              <span className="font-semibold text-primary">
                                {FormatCurrency(total)}
                              </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
