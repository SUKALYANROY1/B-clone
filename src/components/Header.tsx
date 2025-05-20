"use client";

import { Search, ShoppingCart, Menu, Grid, User, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LocationSelector } from "./LocationSelector";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">blinkit</span>
          </Link>

          {/* Location Selector */}
          <div className="hidden md:block">
            <LocationSelector />
          </div>

          {/* Search - Made smaller */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative group">
              <input
                type="search"
                placeholder="Search for products..."
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all group-hover:border-green-500/50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
          </div>

          {/* Navigation Links - Enhanced with active states */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-all",
                pathname === "/" 
                  ? "bg-green-50 text-green-600 font-medium" 
                  : "text-gray-700 hover:text-green-600 hover:bg-green-50/50"
              )}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              href="/categories" 
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-all",
                pathname === "/categories" 
                  ? "bg-green-50 text-green-600 font-medium" 
                  : "text-gray-700 hover:text-green-600 hover:bg-green-50/50"
              )}
            >
              <Grid className="h-5 w-5" />
              <span>Categories</span>
            </Link>
          </div>

          {/* Login and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 hover:border-green-500 hover:shadow-md transition-all">
              <User className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Login</span>
            </button>
            <Link 
              href="/cart" 
              className="relative flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 hover:border-green-500 hover:shadow-md transition-all"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white font-medium">
                0
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden rounded-full border border-gray-200 p-2 hover:border-green-500 hover:shadow-md transition-all">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
} 