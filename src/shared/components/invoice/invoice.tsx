"use client";
// import { Footer } from "@/components/layout/footer";
// import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/axios";
import type { API_RESPONSE } from "@/shared/types/response";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { LoadingComponent } from "./error";
import { StepIndicator } from "./stepIndicator";
import { FormatCurrency } from "@/shared/utils/format";

interface InvoiceData {
  amount: number;
  fee: number;
  nickname: string;
  no_tujuan: string;
  payment_payload: string;
  product_id: number;
  product_name: string;
  status: "PENDING" | "PAID" | "SUCCESS" | "FAILED";
  total_amount: number;
  transaction_type: "topup";
  payment_type: "virtual-account" | "qris" | "e-wallet";
}

export default function InvoicePage() {
  const searchParams = useSearchParams();
  const refId = searchParams.get("refid");

  const { data, isLoading } = useQuery({
    queryKey: ["invoice", refId],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<InvoiceData>>(
        `/transactions/invoice?refid=${refId}`
      );
      return data.data;
    },
    staleTime: 5 * 1000,
    gcTime: 5 * 1000,
    enabled: !!refId,
    refetchInterval: 3000,
  });

  const invoiceData = data?.data as InvoiceData;

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-xl mx-auto space-y-6">
          <StepIndicator currentStatus={invoiceData.status} />

          {/* Invoice Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {invoiceData.product_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Details */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ID/No Tujuan:</span>
                  <span className="font-medium">{invoiceData.no_tujuan}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nickname:</span>
                  <span className="font-medium">{invoiceData.nickname}</span>
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold">Rincian Pembayaran</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Harga Produk:</span>
                    <span>{FormatCurrency(invoiceData.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Biaya Admin:</span>
                    <span>{FormatCurrency(invoiceData.fee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total Pembayaran:</span>
                    <span className="text-primary">
                      <span>{FormatCurrency(invoiceData.total_amount)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {invoiceData.status === "PENDING" &&
                invoiceData.payment_payload && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      {invoiceData.payment_type === "qris" && (
                        <>
                          <h4 className="font-semibold text-center">
                            Scan QR Code untuk Pembayaran
                          </h4>
                          <div className="bg-muted/30 rounded-lg p-6">
                            <div className="bg-background p-4 rounded-lg shadow-sm mx-auto w-fit border">
                              <div
                                className="w-48 h-48 flex items-center justify-center rounded-md"
                                dangerouslySetInnerHTML={{
                                  __html: `<img src="https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=${encodeURIComponent(
                                    invoiceData.payment_payload
                                  )}" alt="QR Code" class="w-full h-full object-contain" />`,
                                }}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {invoiceData.payment_type === "virtual-account" && (
                        <div className="text-center space-y-2">
                          <h4 className="font-semibold">
                            Nomor Virtual Account
                          </h4>
                          <div className="bg-muted/30 rounded-lg p-4 text-lg font-mono">
                            {invoiceData.payment_payload}
                          </div>
                        </div>
                      )}

                      {invoiceData.payment_type === "e-wallet" && (
                        <div className="text-center">
                          <h4 className="font-semibold mb-2">
                            Bayar dengan E-Wallet
                          </h4>
                          <a
                            href={invoiceData.payment_payload}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/80 transition"
                          >
                            Lanjutkan Pembayaran
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
