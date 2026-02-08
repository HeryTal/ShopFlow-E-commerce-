import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();
  const featuredProducts = products.slice(0, 10); // Show first 10 products

  return (
    <div className="py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex flex-col items-center">
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Premium Selection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              <span className="text-blue-900">Popular</span> Products
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id || index}
              className="transform hover:-translate-y-1 transition-transform duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Section */}
        <div className="text-center pt-8">
          <button 
            onClick={() => router.push('/all-products')}
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl hover:from-blue-800 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold"
          >
            <span>View All Products</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="text-slate-600 mt-4 text-sm">
            Showing {featuredProducts.length} of {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;