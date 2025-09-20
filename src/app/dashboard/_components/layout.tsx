import { menuItems, MenuItems } from "@/shared/data/navbarData";
import { useAuthStore } from "@/shared/hooks/authStore";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  PieChart,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  const MenuItem = ({ item }: { item: MenuItems; isBottom?: boolean }) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;
    const { push } = useRouter();
    return (
      <button
        onClick={() => {
          push(item.href);
          handleItemClick(item.id);
        }}
        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        } ${isCollapsed ? "justify-center px-2" : "justify-start"}`}
        title={isCollapsed ? item.label : ""}
      >
        <Icon
          className={`flex-shrink-0 ${
            isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
          } ${
            isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
          }`}
        />

        {!isCollapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>

            {/* Badge or Count */}
            {item.badge && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium  rounded-full">
                {item.badge}
              </span>
            )}

            {item.count && (
              <span
                className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 group-hover:bg-gray-300"
                }`}
              >
                {item.count}
              </span>
            )}
          </>
        )}

        {/* Collapsed state indicator */}
        {isCollapsed && (item.count || item.badge) && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </button>
    );
  };

  const { user, logout } = useAuthStore();

  return (
    <div
      className={` border-r transition-all duration-300 fixed left-0 h-screen ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <PieChart className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.username ?? ""}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role_name}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </nav>

     
    </div>
  );
}
