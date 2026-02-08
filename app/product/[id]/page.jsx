"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart, currency } = useAppContext();
    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState("description");

    // Product specifications and variants
    const sizes = ["XS", "S", "M", "L", "XL"];
    const colors = [
        { name: "Space Gray", value: "bg-gradient-to-br from-slate-700 to-slate-900" },
        { name: "Midnight Blue", value: "bg-gradient-to-br from-blue-900 to-indigo-900" },
        { name: "Silver", value: "bg-gradient-to-br from-slate-300 to-slate-100" },
        { name: "Matte Black", value: "bg-gradient-to-br from-gray-900 to-black" }
    ];
    const features = [
        "Noise Cancelling Technology",
        "30 Hours Battery Life",
        "Wireless & Bluetooth 5.3",
        "Water Resistant (IPX4)",
        "Voice Assistant Support"
    ];

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        if (product) {
            setProductData(product);
            setMainImage(product.image[0]);
            setSelectedSize("M");
            setSelectedColor(colors[0]);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length]);

    const handleAddToCart = () => {
        addToCart(productData._id, quantity);
        // Show success toast or notification
    };

    const handleBuyNow = () => {
        addToCart(productData._id, quantity);
        router.push('/cart');
    };

    const calculateDiscount = () => {
        if (productData.price && productData.offerPrice) {
            return Math.round(((productData.price - productData.offerPrice) / productData.price) * 100);
        }
        return 0;
    };

    if (!productData) return <Loading />;

    const discount = calculateDiscount();

    return (
        <>
            <Navbar />
            
            {/* Product Breadcrumb */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <span 
                            onClick={() => router.push('/')}
                            className="text-slate-600 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                            Home
                        </span>
                        <span className="text-slate-400">/</span>
                        <span 
                            onClick={() => router.push('/all-products')}
                            className="text-slate-600 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                            Shop
                        </span>
                        <span className="text-slate-400">/</span>
                        <span className="text-blue-600 font-medium">{productData.category}</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-900 font-semibold truncate">{productData.name}</span>
                    </nav>
                </div>
            </div>

            <main className="min-h-screen bg-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    {/* Main Product Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                        
                        {/* Product Images */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 overflow-hidden group">
                                {discount > 0 && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                                            -{discount}% OFF
                                        </div>
                                    </div>
                                )}
                                
                                {/* Wishlist Button */}
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all"
                                >
                                    <svg 
                                        className={`w-5 h-5 transition-all ${isWishlisted ? 'text-red-500 scale-110 fill-red-500' : 'text-slate-600'}`}
                                        fill={isWishlisted ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                                
                                <div className="relative h-80 md:h-96">
                                    <Image
                                        src={mainImage || productData.image[0]}
                                        alt={productData.name}
                                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                                        width={600}
                                        height={600}
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-3">
                                {productData.image.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setMainImage(image)}
                                        className={`relative rounded-xl border-2 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-3 transition-all duration-300 ${
                                            mainImage === image 
                                                ? 'border-blue-500 ring-2 ring-blue-500/20' 
                                                : 'border-slate-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${productData.name} thumbnail ${index + 1}`}
                                            className="w-full h-16 object-contain"
                                            width={100}
                                            height={100}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Category & Brand */}
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                                    {productData.category}
                                </span>
                                <span className="text-slate-600 text-sm">Brand: {productData.brand || "Premium Tech"}</span>
                            </div>

                            {/* Product Name */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                                {productData.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
                                            fill={star <= 4 ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-slate-700 font-medium">4.5</span>
                                <span className="text-slate-500">(128 reviews)</span>
                                <span className="text-emerald-600 font-medium text-sm">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-1 animate-pulse"></div>
                                    In Stock
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {productData.description}
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-3">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-slate-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Price */}
                            <div className="py-4">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                        {currency}{productData.offerPrice}
                                    </span>
                                    {productData.price && (
                                        <span className="text-xl text-slate-400 line-through">
                                            {currency}{productData.price}
                                        </span>
                                    )}
                                    {discount > 0 && (
                                        <span className="text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full">
                                            Save {discount}%
                                        </span>
                                    )}
                                </div>
                                <p className="text-slate-500 text-sm mt-2">Free shipping & 30-day returns</p>
                            </div>

                            {/* Variants */}
                            <div className="space-y-6">
                                
                                {/* Quantity */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Quantity</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-slate-300 rounded-lg">
                                            <button 
                                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-2 text-lg font-medium text-slate-900 w-12 text-center">
                                                {quantity}
                                            </span>
                                            <button 
                                                onClick={() => setQuantity(prev => prev + 1)}
                                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-slate-600">Only 12 items left!</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    onClick={handleAddToCart}
                                    className="group flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold"
                                >
                                    <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add to Cart
                                </button>
                                
                                <button
                                    onClick={handleBuyNow}
                                    className="group flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl hover:from-blue-800 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-300 font-semibold"
                                >
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    Buy Now
                                </button>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-2 gap-4 pt-6">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                    <div>
                                        <div className="font-medium text-slate-900">Free Shipping</div>
                                        <div className="text-sm text-slate-600">On orders over $50</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <div className="font-medium text-slate-900">30-Day Returns</div>
                                        <div className="text-sm text-slate-600">Money back guarantee</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="mb-16">
                        <div className="border-b border-slate-200">
                            <div className="flex gap-8">
                                {["description", "specifications", "reviews"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 px-1 text-lg font-medium transition-colors relative ${
                                            activeTab === tab
                                                ? 'text-blue-600'
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        {activeTab === tab && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="py-8">
                            {activeTab === "description" && (
                                <div className="prose max-w-none">
                                    <p className="text-slate-600 leading-relaxed">
                                        {productData.description}
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                            <span>Premium build quality with durable materials</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                            <span>Advanced noise cancellation technology</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                            <span>Long-lasting battery with quick charging</span>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {activeTab === "specifications" && (
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Technical Details</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">Brand</span>
                                                <span className="font-medium">{productData.brand || "Premium Tech"}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">Model</span>
                                                <span className="font-medium">PRO-2024</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">Connectivity</span>
                                                <span className="font-medium">Bluetooth 5.3, 3.5mm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Features</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span>Noise Cancellation</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span>Voice Assistant Support</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span>Water Resistant (IPX4)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "reviews" && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-8">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-slate-900">4.8</div>
                                            <div className="flex justify-center mt-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <div className="text-sm text-slate-600 mt-2">Based on 128 reviews</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">Related Products</h2>
                                <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mt-3"></div>
                            </div>
                            <button 
                                onClick={() => router.push('/all-products')}
                                className="group flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
                            >
                                View All
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.slice(0, 5).map((product, index) => (
                                <div key={index} className="transform hover:-translate-y-2 transition-transform duration-300">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Product;