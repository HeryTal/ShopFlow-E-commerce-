"use client"
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

// Import des icônes React
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  Package, 
  User,
  Settings,
  Store,
  LogOut,
  Search
} from "lucide-react";

const Navbar = () => {
  const { isSeller, router, user, getCartCount } = useAppContext();
  const { openSignIn } = useClerk();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = getCartCount();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/all-products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  // Navigation items for desktop (sans icônes)
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/all-products", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Menu items for user dropdown (en grille 3x2)
  const userMenuItems = [
    { href: "/", label: "Home", icon: Home, color: "text-blue-600" },
    { href: "/all-products", label: "Shop", icon: ShoppingBag, color: "text-purple-600" },
    { href: "/cart", label: "Cart", icon: ShoppingCart, color: "text-emerald-600" },
    { href: "/my-orders", label: "Orders", icon: Package, color: "text-amber-600" },
    { href: "/profile", label: "Profile", icon: User, color: "text-cyan-600" },
    { href: "/settings", label: "Settings", icon: Settings, color: "text-slate-600" },
    ...(isSeller ? [{ href: "/seller", label: "Seller", icon: Store, color: "text-indigo-600" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Image quality fixed */}
          <div 
            onClick={() => router.push('/')}
            className="flex items-center cursor-pointer group"
          >
            <Image
              className="w-32 md:w-36 transition-transform group-hover:scale-105"
              src={assets.logo}
              width={144}  
              height={40}
              alt="TechWave Logo"
              priority
            />
          </div>

          {/* Navigation Links - Desktop (sans icônes) */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="px-4 py-2 rounded-lg text-slate-700 hover:text-blue-900 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}

            {isSeller && (
              <button 
                onClick={() => router.push('/seller')}
                className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 font-medium"
              >
                Seller Dashboard
              </button>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-48 lg:w-64 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
              <button type="submit" className="absolute left-3">
                <Search className="w-4 h-4 text-slate-400" />
              </button>
            </form>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  {/* Cart Icon - Always visible */}
                  <button 
                    onClick={() => router.push('/cart')}
                    className="relative p-2 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <ShoppingCart className="w-6 h-6 text-slate-700 group-hover:text-blue-900 transition-colors" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  {/* User Profile with Grid Dropdown */}
                  <div className="relative group">
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-10 h-10 ring-2 ring-blue-100 hover:ring-blue-300 transition-all",
                          userButtonOuterIdentifier: "text-slate-700"
                        }
                      }}
                    />
                    
                    {/* Grid Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-xl">
                        <div className="font-semibold text-slate-900 truncate">{user.fullName || "Welcome Back"}</div>
                        <div className="text-sm text-slate-500 truncate">{user.email}</div>
                      </div>
                      
                      {/* Navigation Grid 3x2 */}
                      <div className="p-4">
                        <div className="grid grid-cols-3 gap-3">
                          {userMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="group/item flex flex-col items-center justify-center p-3 rounded-xl hover:bg-blue-50 transition-all"
                              >
                                <div className={`w-10 h-10 rounded-full ${item.color.replace('text', 'bg')}/10 flex items-center justify-center mb-2 group-hover/item:scale-110 transition-transform`}>
                                  <Icon className={`w-5 h-5 ${item.color}`} />
                                </div>
                                <span className="text-xs font-medium text-slate-700 group-hover/item:text-blue-700 text-center">{item.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                        
                        {/* Logout Button */}
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <div className="flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Sign Out</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={openSignIn}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 font-medium"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In</span>
                  </button>
                  <button 
                    onClick={openSignIn}
                    className="hidden md:inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl hover:from-blue-800 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 font-semibold"
                  >
                    <span>Get Started</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 bg-white animate-slideDown">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </form>

            {/* Mobile Links Grid */}
            <div className="px-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-full ${item.color.replace('text', 'bg')}/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700 text-center">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <button 
                    onClick={openSignIn}
                    className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl font-semibold"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={openSignIn}
                    className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;