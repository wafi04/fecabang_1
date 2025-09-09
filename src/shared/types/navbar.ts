// 🔹 Tipe umum untuk User (ambil dari store-mu kalau sudah ada)
export type UserType = {
  id: string | number;
  username?: string;
  email: string;
};

// 🔹 Props untuk SearchInput
export interface SearchInputProps {
  className?: string;
  placeholder?: string;
  onClose?: () => void;
  autoFocus?: boolean;
}

// 🔹 Nav Item
export interface NavItemType {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  index: number;
}

// 🔹 Profile Dropdown
export interface ProfileDropdownProps {
  user: UserType;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  onClose: () => void;
  onLogout: () => void;
}

// 🔹 Variants untuk framer-motion
export interface MotionVariants {
  itemVariants: {
    hidden: Record<string, unknown>;
    visible: Record<string, unknown>;
  };
  iconVariants: {
    rest: Record<string, unknown>;
    hover: Record<string, unknown>;
  };
  underlineVariants: {
    rest: Record<string, unknown>;
    hover: Record<string, unknown>;
  };
  popoverVariants: {
    hidden: Record<string, unknown>;
    visible: Record<string, unknown>;
    exit: Record<string, unknown>;
  };
}
