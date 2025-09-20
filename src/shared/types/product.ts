export type PriceType = "hybrid" | "percentage" | "fixed";
export interface ProductReseller {
  id: number;
  created_at: string;
  updated_at: string;
  branchID: number;
  productID: number;
  hargaJual: number;
  hargaModal: number;
  subCategoryName: string;
  subCategoryThumbnail: string;
  subCategoryBanner: string;
  subCategoryInformation: string;
  brand: string;
  typeHarga: PriceType;
  marginValue: number;
  isActive: boolean;
  productName: string;
  hargaPromo: number | null;
}

export interface UpdateProductReseller {
  id: number;
  margin: number;
  hargaPromo: number;
  isActive: boolean;
  productName: string;
}
