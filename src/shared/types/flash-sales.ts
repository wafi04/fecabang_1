export type DiscountType = "percentage" | "fixed";

export interface FlashSale {
  created_at: string;
  description: string;
  end_at: string;
  id: number;
  is_active: boolean;
  start_at: string;
  title: string;
  updated_at: string;
}
export interface UpsertFlashSale {
  title: string; // required
  description?: string | null;
  start_at: string; // required
  end_at: string; // required
  is_active: boolean;
  // products: UpsertFlashSaleProducts[];
}

export interface UpsertFlashSaleProducts {
  productId: number;
  originalPrice: number;
  stockReserved: number;
  stockSold: number;
  flashSalePrice: number;
  thumbnail: string;
  usagePerUser: number;
}

export interface Product {
  id: number;
  name: string;
}

export interface FlashSaleProduct {
  id: number;
  flash_sale_id: number;
  product_id: number;
  original_price: number;
  flash_sale_price: number;
  stock_reserved: number;
  stock_sold: number;
  thumbnail: string;
  usage_per_user: number;
  created_at: string; // ISO date string
  product: Product;
}

export interface FlashSaleData {
  id: number;
  title: string;
  description: string | null;
  start_at: string; // ISO date string
  end_at: string;   // ISO date string
  is_active: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  products: FlashSaleProduct[];
}
