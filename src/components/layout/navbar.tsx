"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { dataNav } from "@/shared/data/navbarData";
import Link from "next/link";
import { AuthDropdown } from "@/shared/features/auth/component/authDropdown";
import { WebSettings } from "@/shared/types/websettings";
import Image from "next/image";

export function Navbar({ data }: { data: WebSettings }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={data.logo_url}
              alt={data.website_name}
              width={50}
              height={50}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {dataNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span className="relative z-10">
                    {item.name.toUpperCase()}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthDropdown />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground hover:bg-accent p-2 rounded-md transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {dataNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
