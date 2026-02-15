'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount, currency } = useAppContext();
  const [isRemoving, setIsRemoving] = useState({});
  const [quantities, setQuantities] = useState({});

  const getProductImages = (product) => {
    if (Array.isArray(product?.images) && product.images.length > 0) return product.images;
    if (Array.isArray(product?.image) && product.image.length > 0) return product.image;
    return [assets.upload_area];
  };

  const cartProducts = Object.keys(cartItems)
    .map(itemId => {
      const product = products.find(p => p._id === itemId);
      return product ? { ...product, quantity: cartItems[itemId] } : null;
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce((sum, product) => {
    return sum + (product.offerPrice * product.quantity);
  }, 0);

  const handleRemove = async (productId) => {
    setIsRemoving(prev => ({ ...prev, [productId]: true }));
    
    // Animation delay before removing
    setTimeout(() => {
      updateCartQuantity(productId, 0);
      setIsRemoving(prev => ({ ...prev, [productId]: false }));
    }, 300);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(productId);
      return;
    }
    updateCartQuantity(productId, newQuantity);
  };

  const handleQuickUpdate = (productId, change) => {
    const currentQty = cartItems[productId];
    const newQty = currentQty + change;
    
    if (newQty < 1) {
      handleRemove(productId);
    } else {
      updateCartQuantity(productId, newQty);
    }
  };

  const calculateDiscount = (product) => {
    if (product.price && product.offerPrice) {
      return Math.round(((product.price - product.offerPrice) / product.price) * 100);
    }
    return 0;
  };

  const isEmpty = cartProducts.length === 0;

  return (
    <>
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  Shopping Cart
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                Your <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Cart</span>
              </h1>
              <p className="text-slate-600">
                Review and manage your items before checkout
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">{getCartCount()} items</div>
              <p className="text-slate-600">in your cart</p>
            </div>
          </div>
        </div>
      </div>

      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          {isEmpty ? (
            /* Empty Cart State */
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="w-48 h-48 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-24 h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <button
                onClick={() => router.push('/all-products')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold"
              >
                <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Start Shopping
              </button>
            </div>
          ) : (
            /* Cart with Items */
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                {/* Cart Header */}
                <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-lg font-semibold text-slate-900">Cart Items ({getCartCount()})</span>
                  </div>
                  <button
                    onClick={() => {
                      // Clear all items
                      Object.keys(cartItems).forEach(id => updateCartQuantity(id, 0));
                    }}
                    className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartProducts.map((product) => {
                    const discount = calculateDiscount(product);
                    const isRemovingItem = isRemoving[product._id];
                    const [productImage] = getProductImages(product);

                    return (
                      <div 
                        key={product._id}
                        className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                          isRemovingItem ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Product Image */}
                            <div className="relative flex-shrink-0">
                              <div className="w-32 h-32 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4">
                                <Image
                                  src={productImage}
                                  alt={product.name}
                                  className="w-full h-full object-contain"
                                  width={128}
                                  height={128}
                                />
                              </div>
                              
                              {discount > 0 && (
                                <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  -{discount}%
                                </div>
                              )}
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <div className="flex-1">
                                  <h3 
                                    onClick={() => router.push(`/product/${product._id}`)}
                                    className="text-xl font-bold text-slate-900 mb-2 hover:text-blue-700 cursor-pointer transition-colors"
                                  >
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                                    {product.description}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm px-2 py-1 rounded-full ${
                                      product.stock > 0 
                                        ? 'bg-emerald-100 text-emerald-700' 
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                    <span className="text-sm text-slate-500">|</span>
                                    <span className="text-sm text-slate-500">Free Shipping</span>
                                  </div>
                                </div>

                                {/* Price */}
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-slate-900">
                                    {currency}{product.offerPrice.toFixed(2)}
                                  </div>
                                  {product.price && product.price > product.offerPrice && (
                                    <div className="text-sm text-slate-400 line-through">
                                      {currency}{product.price.toFixed(2)}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                  {/* Quantity Selector */}
                                  <div className="flex items-center border border-slate-300 rounded-xl">
                                    <button
                                      onClick={() => handleQuickUpdate(product._id, -1)}
                                      className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors rounded-l-xl"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                      </svg>
                                    </button>
                                    
                                    <div className="w-12 h-10 flex items-center justify-center">
                                      <span className="font-medium text-slate-900">{product.quantity}</span>
                                    </div>
                                    
                                    <button
                                      onClick={() => handleQuickUpdate(product._id, 1)}
                                      className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors rounded-r-xl"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                      </svg>
                                    </button>
                                  </div>

                                  {/* Remove Button */}
                                  <button
                                    onClick={() => handleRemove(product._id)}
                                    className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition-colors"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Remove
                                  </button>
                                </div>

                                {/* Subtotal */}
                                <div className="text-right">
                                  <div className="text-lg font-bold text-slate-900">
                                    {currency}{(product.offerPrice * product.quantity).toFixed(2)}
                                  </div>
                                  <div className="text-sm text-slate-500">
                                    {product.quantity} × {currency}{product.offerPrice}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue Shopping */}
                <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">Need more items?</h3>
                      <p className="text-slate-600">Continue shopping to add more products to your cart</p>
                    </div>
                    <button
                      onClick={() => router.push('/all-products')}
                      className="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-xl hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 font-semibold"
                    >
                      <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Continue Shopping
                    </button>
                  </div>
                </div>

                {/* Cart Summary Mobile */}
                <div className="lg:hidden mt-8">
                  <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-slate-200 p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
                      Order Summary
                    </h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-medium text-slate-900">{currency}{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Shipping</span>
                        <span className="font-medium text-emerald-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax</span>
                        <span className="font-medium text-slate-900">{currency}{(subtotal * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-blue-900">{currency}{(subtotal * 1.1).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:w-1/3">
                <div className="lg:sticky lg:top-8">
                  <OrderSummary />
                </div>
              </div>
            </div>
          )}

          {/* Recently Viewed / Recommendations */}
          {!isEmpty && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">You might also like</h2>
                  <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
                </div>
                <button
                  onClick={() => router.push('/all-products')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all
                </button>
              </div>
              
              {/* Product Recommendations Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(0, 4).map((product) => (
                  <div 
                    key={product._id}
                    onClick={() => router.push(`/product/${product._id}`)}
                    className="group bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 cursor-pointer transition-all"
                  >
                    <div className="w-full h-32 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg mb-3 p-3">
                      <Image
                        src={getProductImages(product)[0]}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        width={200}
                        height={200}
                      />
                    </div>
                    <h3 className="font-medium text-slate-900 line-clamp-1 mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-900">{currency}{product.offerPrice}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product._id);
                        }}
                        className="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 rounded-lg hover:from-blue-200 hover:to-cyan-200 transition-all flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
