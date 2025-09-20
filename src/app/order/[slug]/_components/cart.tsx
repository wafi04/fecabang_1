import { Button } from "@/components/ui/button";
import { useOrder } from "@/shared/hooks/formOrder";
import { FormatCurrency } from "@/shared/utils/format";
import { DialogValidateTransactions } from "./dialogValidate";

export function Cart() {
  const { selectedMethod, selectedProduct,transactionResult ,isSubmitting,confirmOrder,showDialog,closeDialog} = useOrder();

  if (!selectedProduct) {
    return null;
  }

  return (
    <>
    <div>
      <div className="space-y-3 bg-card p-4 rounded-lg border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Ringkasan Pesanan
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-foreground">Produk</span>
            <span className="text-sm text-foreground">
              {selectedProduct?.name || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-foreground">Harga</span>
            <span className="text-sm text-foreground">
              {selectedProduct ? FormatCurrency(selectedProduct.price) : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-foreground">Metode Pembayaran</span>
            <span className="text-sm text-foreground">
              {selectedMethod?.name || "-"}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-sm font-semibold text-foreground">Total</span>
            <span className="text-sm font-semibold text-foreground">
              {selectedProduct ? FormatCurrency(selectedMethod?.total ?? 0) : "-"}
            </span>
          </div>
          <Button onClick={confirmOrder} disabled={isSubmitting} className="w-full mt-4">
            {isSubmitting ? "Memproses..." : "Konfirmasi Pesanan"}
          </Button>
        </div>
      </div>
    </div>
    {
        showDialog && transactionResult && (
            <DialogValidateTransactions transactionData={transactionResult} isOpen={showDialog} onClose={closeDialog}/>
        )
    }
    </>
  );
}
