"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProductReseller } from "@/shared/types/product";
import { FormatCurrency, formatDate } from "@/shared/utils/format";
import { useState } from "react";
import { useUpdateResellerPricing } from "../hooks/useResellerPricing";

interface TableProductsProps {
  products: ProductReseller[];
}

export function TableProducts({ products }: TableProductsProps) {
  const [editedProducts, setEditedProducts] =
    useState<ProductReseller[]>(products);
  const { mutate, isPending } = useUpdateResellerPricing();

  const handleChange = (
    id: string,
    field: keyof ProductReseller,
    value: string | number | null | boolean
  ) => {
    setEditedProducts((prev) =>
      prev.map((p) =>
        `${p.productID}-${p.branchID}` === id ? { ...p, [field]: value } : p
      )
    );
  };

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

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m6 0h6m-6 6v6m0-6h6m-6 0V6"
              />
            </svg>
          </div>
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
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Produk Reseller ({products.length})
          </h2>
          <div className="text-sm text-gray-500">
            Update terakhir:{" "}
            {formatDate(products[0]?.updated_at || new Date().toISOString())}
          </div>
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga Modal
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga Jual
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Margin
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga Promo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Update
              </th>
              <th />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {editedProducts.map((product) => {
              const id = `${product.productID}-${product.branchID}`;
              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Input
                      value={product.productName}
                      onChange={(e) =>
                        handleChange(id, "productName", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {FormatCurrency(product.hargaModal)}
                    </div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {FormatCurrency(product.hargaJual)}
                  </td>

                  <td className="w-32 p-4 whitespace-nowrap">
                    <Input
                      type="number"
                      pattern="[0-9]*"
                      value={product.marginValue}
                      onChange={(e) => {
                        const raw = e.target.value;
                        if (/^\d*$/.test(raw)) {
                          const value = raw === "" ? null : Number(raw);
                          handleChange(id, "marginValue", value);
                        }
                      }}
                    />
                  </td>

                  <td className="w-32 p-4 whitespace-nowrap">
                    <Input
                      type="text"
                      pattern="[0-9]*"
                      min={product.hargaModal}
                      value={product.hargaPromo ?? 0}
                       onChange={(e) => {
                        const raw = e.target.value;
                        if (/^\d*$/.test(raw)) {
                          const value = raw === "" ? null : Number(raw);
                          handleChange(id, "hargaPromo", value);
                        }
                      }}
                    />
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <Switch
                      checked={product.isActive}
                      onCheckedChange={(val) =>
                        handleChange(id, "isActive", val)
                      }
                    />
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(product.updated_at)}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
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
