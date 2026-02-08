'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useState, useEffect } from "react";

const AllProducts = () => {
    const { products, router } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [activeCategory, setActiveCategory] = useState("all");
    const [sortBy, setSortBy] = useState("featured");
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const productsPerPage = 12;

    // Categories
    const categories = [
        { id: "all", label: "All Products", count: products.length },
        { id: "electronics", label: "Electronics", count: products.filter(p => p.category === "electronics").length },
        { id: "audio", label: "Audio", count: products.filter(p => p.category === "audio").length },
        { id: "gaming", label: "Gaming", count: products.filter(p => p.category === "gaming").length },
        { id: "computers", label: "Computers", count: products.filter(p => p.category === "computers").length },
        { id: "accessories", label: "Accessories", count: products.filter(p => p.category === "accessories").length },
    ];

    // Sort options
    const sortOptions = [
        { id: "featured", label: "Featured" },
        { id: "newest", label: "Newest" },
        { id: "price-low", label: "Price: Low to High" },
        { id: "price-high", label: "Price: High to Low" },
        { id: "rating", label: "Customer Rating" },
    ];

    // Filter and sort products
    useEffect(() => {
        let result = [...products];

        // Filter by category
        if (activeCategory !== "all") {
            result = result.filter(product => product.category === activeCategory);
        }

        // Filter by search query
        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by price range
        result = result.filter(product =>
            product.offerPrice >= priceRange[0] && product.offerPrice <= priceRange[1]
        );

        // Sort products
        switch (sortBy) {
            case "newest":
                result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                break;
            case "price-low":
                result.sort((a, b) => a.offerPrice - b.offerPrice);
                break;
            case "price-high":
                result.sort((a, b) => b.offerPrice - a.offerPrice);
                break;
            case "rating":
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default: // featured
                result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        }

        setFilteredProducts(result);
        setCurrentPage(1);
    }, [products, activeCategory, sortBy, priceRange, searchQuery]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClearFilters = () => {
        setActiveCategory("all");
        setSortBy("featured");
        setPriceRange([0, 2000]);
        setSearchQuery("");
    };

    return (
        <>
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 border-b border-slate-200">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                                Premium Collection
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                            Discover Our{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Products
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                            Browse our curated selection of premium electronics and accessories
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full px-6 py-4 pl-14 bg-white border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="min-h-screen bg-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <div className="lg:w-1/4">
                            <div className="sticky top-8 space-y-6">
                                {/* Categories */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        Categories
                                    </h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.id)}
                                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                                                    activeCategory === category.id
                                                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200'
                                                        : 'hover:bg-slate-50 text-slate-700'
                                                }`}
                                            >
                                                <span className="font-medium">{category.label}</span>
                                                <span className={`text-sm px-2 py-1 rounded-full ${
                                                    activeCategory === category.id
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                    {category.count}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Price Range
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-600">${priceRange[0]}</span>
                                            <span className="text-slate-600">${priceRange[1]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="2000"
                                            step="50"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="2000"
                                            step="50"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                {(activeCategory !== "all" || sortBy !== "featured" || priceRange[0] > 0 || priceRange[1] < 2000 || searchQuery) && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all font-medium"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear All Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="lg:w-3/4">
                            {/* Results Header */}
                            <div className="mb-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
                                        </h2>
                                        <p className="text-slate-600 mt-1">
                                            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-700 font-medium">Sort by:</span>
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                {sortOptions.map((option) => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <div className="hidden md:flex items-center gap-2">
                                            <span className="text-slate-700 font-medium">View:</span>
                                            <div className="flex gap-1">
                                                <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                    </svg>
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-slate-600">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Filters */}
                                {(activeCategory !== "all" || sortBy !== "featured" || priceRange[0] > 0 || priceRange[1] < 2000 || searchQuery) && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {activeCategory !== "all" && (
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                                {categories.find(c => c.id === activeCategory)?.label}
                                                <button onClick={() => setActiveCategory("all")} className="hover:text-blue-900">
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                        {priceRange[0] > 0 && (
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                                Min: ${priceRange[0]}
                                                <button onClick={() => setPriceRange([0, priceRange[1]])} className="hover:text-blue-900">
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                        {priceRange[1] < 2000 && (
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                                Max: ${priceRange[1]}
                                                <button onClick={() => setPriceRange([priceRange[0], 2000])} className="hover:text-blue-900">
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                        {searchQuery && (
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                                Search: "{searchQuery}"
                                                <button onClick={() => setSearchQuery("")} className="hover:text-blue-900">
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Products Grid */}
                            {currentProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">No products found</h3>
                                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                        Try adjusting your search or filter criteria to find what you're looking for.
                                    </p>
                                    <button
                                        onClick={handleClearFilters}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                        {currentProducts.map((product, index) => (
                                            <div key={product._id || index} className="transform hover:-translate-y-2 transition-transform duration-300">
                                                <ProductCard product={product} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-slate-200">
                                            <div className="text-slate-600">
                                                Page {currentPage} of {totalPages}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    Previous
                                                </button>
                                                
                                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                    let pageNum;
                                                    if (totalPages <= 5) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage <= 3) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage >= totalPages - 2) {
                                                        pageNum = totalPages - 4 + i;
                                                    } else {
                                                        pageNum = currentPage - 2 + i;
                                                    }
                                                    
                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                                                currentPage === pageNum
                                                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                                                                    : 'border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-700'
                                                            }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                })}
                                                
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-20">
                        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
                                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 translate-y-32"></div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                    Can't Find What You're Looking For?
                                </h3>
                                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                                    Contact our support team for personalized product recommendations
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button 
                                        onClick={() => router.push('/contact')}
                                        className="group px-8 py-3.5 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                                    >
                                        Contact Support
                                    </button>
                                    <button className="group px-8 py-3.5 border-2 border-white/30 text-white rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-300">
                                        <span className="flex items-center gap-2">
                                            Sign Up for Updates
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default AllProducts;