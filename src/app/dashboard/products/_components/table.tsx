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
  const { products: editedProducts, setProducts, updateProduct } =
    useProductsStore();
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
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-8 text-center">
          <div className="text-gray-400 mb-4">🚀</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada data produk
          </h3>
          <p className="text-gray-500">
            Belum ada produk reseller yang tersedia.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 flex justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Produk Reseller ({editedProducts.length})
        </h2>
        <div className="text-sm text-gray-500">
          Update terakhir:{" "}
          {formatDate(editedProducts[0]?.updated_at || new Date().toISOString())}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produk
              </th>
              <th className="px-4 py-3">Harga Modal</th>
              <th className="px-4 py-3">Harga Jual</th>
              <th className="px-4 py-3">Margin</th>
              <th className="px-4 py-3">Harga Promo</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Update</th>
              <th />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {editedProducts.map((product) => {
              const id = `${product.productID}-${product.branchID}`;
              return (
                <tr key={id} className="hover:bg-gray-50">
                  {/* Nama Produk */}
                  <td className="px-4 py-4">
                    <Input
                      value={product.productName}
                      onChange={(e) =>
                        updateProduct(id, "productName", e.target.value)
                      }
                    />
                  </td>

                  {/* Harga Modal */}
                  <td className="px-4 py-4">{FormatCurrency(product.hargaModal)}</td>

                  {/* Harga Jual */}
                  <td className="px-4 py-4">{FormatCurrency(product.hargaJual)}</td>

                  {/* Margin */}
                  <td className="px-4 py-4 w-32">
                    <Input
                      type="number"
                      value={product.marginValue ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const value = raw === "" ? null : Number(raw);
                        updateProduct(id, "marginValue", value);
                      }}
                    />
                  </td>

                  {/* Harga Promo */}
                  <td className="px-4 py-4 w-32">
                    <Input
                      type="number"
                      value={product.hargaPromo ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const value = raw === "" ? null : Number(raw);
                        updateProduct(id, "hargaPromo", value);
                      }}
                    />
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <Switch
                      checked={product.isActive}
                      onCheckedChange={(val) => updateProduct(id, "isActive", val)}
                    />
                  </td>

                  {/* Update Time */}
                  <td className="px-4 py-4 text-sm text-gray-500">
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
