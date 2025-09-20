import {
  Home,
  LucideProps,
  Package,
  Settings2,
  ShoppingCart,
  Users
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export const dataNav = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "cek-transaksi",
    href: "/cek-transaksi",
  },
  {
    name: "leaderboard",
    href: "/leaderboard",
  },
];

export interface MenuItems {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  href: string;
  badge?: string;
  count?: number;
}

export const menuItems: MenuItems[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    href: "/dashboard/customers",
    count: 2.543,
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    href: "/dashboard/orders",
    count: 12,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings2,
    href: "/dashboard/settings",
  },
];
