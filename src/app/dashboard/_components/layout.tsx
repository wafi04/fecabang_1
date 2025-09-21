"use client";
import { menuItems, MenuItems } from "@/shared/data/navbarData";
import { useAuthStore } from "@/shared/hooks/authStore";
import { ChevronLeft, ChevronRight, PieChart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const { user } = useAuthStore();
  const { push } = useRouter();

  const handleItemClick = (itemId: string, href: string) => {
    push(href);
    setActiveItem(itemId);
  };

  const MenuItem = ({ item }: { item: MenuItems }) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;

    return (
      <Button
        variant={isActive ? "default" : "ghost"}
        onClick={() => handleItemClick(item.id, item.href)}
        className={`w-full flex items-center rounded-lg text-sm font-medium transition-all duration-200 group ${
          isCollapsed ? "justify-center px-2" : "justify-start px-3 py-2"
        }`}
        title={isCollapsed ? item.label : ""}
      >
        <Icon
          className={`flex-shrink-0 ${
            isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
          }`}
        />
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
          </>
        )}
      </Button>
    );
  };

  return (
    <div
      className={`border-r bg-background transition-all duration-300 fixed left-0 h-screen ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <PieChart className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold">Dashboard</h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.username ?? ""}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.role_name}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </nav>
    </div>
  );
}
