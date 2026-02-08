'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

const MyOrders = () => {
    const { currency, router } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");
    const [expandedOrder, setExpandedOrder] = useState(null);

    const filters = [
        { id: "all", label: "All Orders", count: 12 },
        { id: "processing", label: "Processing", count: 3 },
        { id: "shipped", label: "Shipped", count: 4 },
        { id: "delivered", label: "Delivered", count: 5 },
        { id: "cancelled", label: "Cancelled", count: 0 }
    ];

    const fetchOrders = async () => {
        // Simulate API call
        setTimeout(() => {
            setOrders(orderDummyData);
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' };
            case 'shipped':
                return { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' };
            case 'delivered':
                return { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' };
            case 'cancelled':
                return { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' };
            default:
                return { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' };
        }
    };

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const filteredOrders = activeFilter === "all" 
        ? orders 
        : orders.filter(order => order.status.toLowerCase() === activeFilter);

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
                                    Order History
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                                My <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Orders</span>
                            </h1>
                            <p className="text-slate-600 max-w-2xl">
                                Track, manage, and review all your purchases in one place
                            </p>
                        </div>
                        
                        <button
                            onClick={() => router.push('/all-products')}
                            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold"
                        >
                            <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>

            <main className="min-h-screen bg-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    {/* Filters */}
                    <div className="mb-10">
                        <div className="flex flex-wrap gap-3 mb-6">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`group relative px-5 py-2.5 rounded-xl border transition-all duration-300 ${
                                        activeFilter === filter.id
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-lg'
                                            : 'bg-white border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-700'
                                    }`}
                                >
                                    <span className="font-medium">{filter.label}</span>
                                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                        activeFilter === filter.id
                                            ? 'bg-white/20'
                                            : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {filter.count}
                                    </span>
                                    
                                    {activeFilter === filter.id && (
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-slate-200">
                                <div className="text-3xl font-bold text-blue-900 mb-2">{orders.length}</div>
                                <div className="text-sm text-slate-600">Total Orders</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-slate-200">
                                <div className="text-3xl font-bold text-emerald-900 mb-2">
                                    {currency}
                                    {orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}
                                </div>
                                <div className="text-sm text-slate-600">Total Spent</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-slate-200">
                                <div className="text-3xl font-bold text-cyan-900 mb-2">
                                    {orders.filter(o => o.status === 'delivered').length}
                                </div>
                                <div className="text-sm text-slate-600">Delivered</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-slate-200">
                                <div className="text-3xl font-bold text-purple-900 mb-2">
                                    {orders.filter(o => o.status === 'processing' || o.status === 'shipped').length}
                                </div>
                                <div className="text-sm text-slate-600">In Progress</div>
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loading />
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">No orders found</h3>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                You haven't placed any orders yet. Start shopping to see your orders here.
                            </p>
                            <button
                                onClick={() => router.push('/all-products')}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                            >
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredOrders.map((order, index) => {
                                const statusColor = getStatusColor(order.status);
                                const orderDate = new Date(order.date);
                                const formattedDate = orderDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                });
                                const formattedTime = orderDate.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                return (
                                    <div key={order.id || index} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                                        {/* Order Header */}
                                        <div className="p-6 border-b border-slate-100">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl ${statusColor.bg} flex items-center justify-center`}>
                                                        <div className={`w-3 h-3 ${statusColor.dot} rounded-full animate-pulse`}></div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="text-lg font-bold text-slate-900">Order #{order.id || `ORD${1000 + index}`}</h3>
                                                            <span className={`px-3 py-1 ${statusColor.bg} ${statusColor.text} text-sm font-medium rounded-full`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-600 text-sm mt-1">
                                                            Placed on {formattedDate} at {formattedTime}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                                        {currency}{order.amount.toFixed(2)}
                                                    </div>
                                                    <p className="text-sm text-slate-600">{order.items.length} items</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Content - Collapsible */}
                                        <div className={`overflow-hidden transition-all duration-500 ${
                                            expandedOrder === (order.id || index) ? 'max-h-[1000px]' : 'max-h-0'
                                        }`}>
                                            <div className="p-6 border-b border-slate-100">
                                                <h4 className="text-lg font-semibold text-slate-900 mb-4">Order Items</h4>
                                                <div className="space-y-4">
                                                    {order.items.map((item, itemIndex) => (
                                                        <div key={itemIndex} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
                                                            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-lg flex items-center justify-center">
                                                                {item.product.image ? (
                                                                    <Image
                                                                        src={item.product.image[0]}
                                                                        alt={item.product.name}
                                                                        className="w-12 h-12 object-contain"
                                                                        width={48}
                                                                        height={48}
                                                                    />
                                                                ) : (
                                                                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="font-medium text-slate-900">{item.product.name}</h5>
                                                                <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                                                                <div className="flex items-center gap-4 mt-1">
                                                                    <span className="text-sm text-slate-500">Size: {item.size || 'M'}</span>
                                                                    <span className="text-sm text-slate-500">Color: {item.color || 'Black'}</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-semibold text-slate-900">
                                                                    {currency}{(item.product.offerPrice * item.quantity).toFixed(2)}
                                                                </div>
                                                                <button
                                                                    onClick={() => router.push(`/product/${item.product._id}`)}
                                                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                                                >
                                                                    View Product
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Shipping Details */}
                                            <div className="p-6 border-b border-slate-100">
                                                <h4 className="text-lg font-semibold text-slate-900 mb-4">Shipping Details</h4>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                                                        <div className="flex items-start gap-3">
                                                            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <div>
                                                                <h5 className="font-medium text-slate-900 mb-1">Delivery Address</h5>
                                                                <p className="text-slate-600">
                                                                    {order.address.fullName}<br />
                                                                    {order.address.area}<br />
                                                                    {order.address.city}, {order.address.state}<br />
                                                                    {order.address.phoneNumber}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                                                        <div className="flex items-start gap-3">
                                                            <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <div>
                                                                <h5 className="font-medium text-slate-900 mb-1">Delivery Status</h5>
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <div className={`w-3 h-3 ${statusColor.dot} rounded-full animate-pulse`}></div>
                                                                    <span className={`font-medium ${statusColor.text}`}>{order.status}</span>
                                                                </div>
                                                                <p className="text-sm text-slate-600">
                                                                    Estimated delivery: {order.estimatedDelivery || 'Within 5-7 business days'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Payment Details */}
                                            <div className="p-6">
                                                <h4 className="text-lg font-semibold text-slate-900 mb-4">Payment Details</h4>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">Subtotal</span>
                                                            <span className="font-medium">{currency}{(order.amount * 0.96).toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">Shipping</span>
                                                            <span className="font-medium text-emerald-600">Free</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">Tax</span>
                                                            <span className="font-medium">{currency}{(order.amount * 0.04).toFixed(2)}</span>
                                                        </div>
                                                        <div className="border-t border-slate-200 pt-3">
                                                            <div className="flex justify-between">
                                                                <span className="text-lg font-bold text-slate-900">Total</span>
                                                                <span className="text-2xl font-bold text-blue-900">{currency}{order.amount.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl">
                                                        <div className="flex items-start gap-3">
                                                            <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <div>
                                                                <h5 className="font-medium text-slate-900 mb-1">Payment Method</h5>
                                                                <p className="text-slate-600 mb-2">{order.paymentMethod || 'Credit Card'}</p>
                                                                <p className={`text-sm ${order.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-orange-600'}`}>
                                                                    Status: {order.paymentStatus || 'Pending'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="p-6 border-t border-slate-100">
                                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                                <button
                                                    onClick={() => toggleOrderDetails(order.id || index)}
                                                    className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    {expandedOrder === (order.id || index) ? 'Hide' : 'View'} Details
                                                    <svg className={`w-4 h-4 transform transition-transform ${expandedOrder === (order.id || index) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                
                                                <div className="flex gap-3">
                                                    <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:border-blue-400 hover:text-blue-700 transition-colors text-sm font-medium">
                                                        Track Order
                                                    </button>
                                                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all text-sm font-medium">
                                                        Buy Again
                                                    </button>
                                                    {order.status === 'delivered' && (
                                                        <button className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium">
                                                            Leave Review
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default MyOrders;