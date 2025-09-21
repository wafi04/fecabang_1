"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FormatCurrency, formatDate } from "@/shared/utils/format";
import { ProductReseller } from "@/shared/types/product";
import { useEffect } from "react";
import { useUpdateResellerPricing } from "../hooks/useResellerPricing";
import { useProductsStore } from "../hooks/useUpdateStore";

interface TableProductsProps {
  products: ProductReseller[];
}

export function TableProducts({ products }: TableProductsProps) {
  const {
    products: editedProducts,
    setProducts,
    updateProduct,
  } = useProductsStore();
  const { mutate, isPending } = useUpdateResellerPricing();

  // pertama kali set data ke store
  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  const handleSave = (id: string, productID: number) => {
    const product = editedProducts.find(
      (p) => `${p.productID}-${p.branchID}` === id
    );
    if (!product) return;

    mutate({
      id: productID,
      productName: product.productName,
      margin: product.marginValue,
      hargaPromo: product.hargaPromo ?? 0,
      isActive: product.isActive,
    });
  };

  if (editedProducts.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="px-4 py-8 text-center">
          <div className="text-muted-foreground mb-4 text-4xl">🚀</div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Tidak ada data produk
          </h3>
          <p className="text-muted-foreground">
            Belum ada produk reseller yang tersedia.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Produk Reseller ({editedProducts.length})
        </h2>
        <div className="text-sm text-muted-foreground">
          Update terakhir:{" "}
          {formatDate(
            editedProducts[0]?.updated_at || new Date().toISOString()
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Produk
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Harga Modal
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Harga Jual
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Margin
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Harga Promo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Update
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {editedProducts.map((product) => {
              const id = `${product.productID}-${product.branchID}`;
              return (
                <tr key={id} className="hover:bg-muted/50 transition-colors">
                  {/* Nama Produk */}
                  <td className="px-4 py-4">{product.productName}</td>

                  {/* Harga Modal */}
                  <td className="px-4 py-4 text-foreground font-medium">
                    {FormatCurrency(product.hargaModal)}
                  </td>

                  {/* Harga Jual */}
                  <td className="px-4 py-4 text-foreground font-medium">
                    {FormatCurrency(product.hargaJual)}
                  </td>

                  {/* Margin */}
                  <td className="px-4 py-4 w-32">
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={product.marginValue ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, ""); // hapus semua non-digit
                        const value = raw === "" ? null : Number(raw);
                        updateProduct(id, "marginValue", value);
                      }}
                      placeholder="0"
                    />
                  </td>

                  {/* Harga Promo */}
                  <td className="px-4 py-4 w-32">
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={product.hargaPromo ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, ""); // hapus semua non-digit
                        const value = raw === "" ? null : Number(raw);
                        updateProduct(id, "hargaPromo", value);
                      }}
                      placeholder="0"
                    />
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <Switch
                      checked={product.isActive}
                      onCheckedChange={(val) =>
                        updateProduct(id, "isActive", val)
                      }
                    />
                  </td>

                  {/* Update Time */}
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {formatDate(product.updated_at)}
                  </td>

                  {/* Save */}
                  <td className="px-4 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSave(id, product.id)}
                      disabled={isPending}
                    >
                      {isPending ? "Saving..." : "Save"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
