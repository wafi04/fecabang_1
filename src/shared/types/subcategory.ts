export interface SubCategory {
  id: number;
  name: string;
  subName: string;
  brand: string;
  thumbnail: string;
  bannerUrl: string;
  information: string;
  instruction: string;
  isActive: boolean;
  isCheckNickname: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductOrder {
  productName: string;
  productCode: string;
  productPrice: number;
}

export interface SubCategoryWithProducts {
  subCategoryId : number
  subCategoryName: string;
  subCategorySubName: string;
  subCategoryThumbnail: string;
  subCategoryBanner: string;
  productTypes: {
    products: ProductOrder[];
    typeName: string;
  }[];
}


export interface CreateSubCategory {
  name : string
subName : string
brand : string
categoryType : string
	thumbnail : string
	bannerUrl : string
isActive : boolean
instruction : string
information : string
isCheckNickname : boolean
}


export type CategoryType = "games" | "voucher" | "pulsa" | "ewallet" | "pln";
export type CategoryOmit = Omit<Category, "created_at" | "updated_at">;
export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  type: CategoryType;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}