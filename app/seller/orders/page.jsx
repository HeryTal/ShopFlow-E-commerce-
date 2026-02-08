'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

// Import des icônes Lucide React
import { 
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Filter,
  Search,
  ChevronDown,
  Download,
  MoreVertical,
  Eye,
  Printer,
  DollarSign,
  MapPin,
  Phone,
  Calendar,
  User
} from "lucide-react";

const Orders = () => {
    const { currency } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [sortBy, setSortBy] = useState("newest");

    const statusOptions = [
        { value: "all", label: "All Orders", color: "bg-slate-200", icon: Package, count: 12 },
        { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-800", icon: Clock, count: 3 },
        { value: "processing", label: "Processing", color: "bg-blue-100 text-blue-800", icon: Package, count: 4 },
        { value: "shipped", label: "Shipped", color: "bg-purple-100 text-purple-800", icon: Truck, count: 3 },
        { value: "delivered", label: "Delivered", color: "bg-emerald-100 text-emerald-800", icon: CheckCircle, count: 2 },
        { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle, count: 0 },
    ];

    const fetchSellerOrders = async () => {
        // Simulate API call
        setTimeout(() => {
            const ordersWithStatus = orderDummyData.map((order, index) => ({
                ...order,
                id: `ORD-${Date.now() + index}`,
                status: ["pending", "processing", "shipped", "delivered"][index % 4],
                orderDate: new Date(order.date),
                estimatedDelivery: new Date(new Date(order.date).setDate(new Date(order.date).getDate() + Math.floor(Math.random() * 5) + 2)),
                paymentStatus: index % 3 === 0 ? "paid" : "pending",
                customerEmail: `customer${index}@email.com`,
            }));
            setOrders(ordersWithStatus);
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        fetchSellerOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === "all" || order.status === filterStatus;
        const matchesSearch = !searchQuery || 
            order.address.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some(item => item.product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const option = statusOptions.find(opt => opt.value === status);
        if (!option) return null;
        const Icon = option.icon;
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${option.color}`}>
                <Icon className="w-4 h-4" />
                {option.label}
            </span>
        );
    };

    const handleSelectOrder = (orderId) => {
        setSelectedOrders(prev => 
            prev.includes(orderId) 
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const handleSelectAll = () => {
        if (selectedOrders.length === filteredOrders.length && filteredOrders.length > 0) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(filteredOrders.map(order => order.id));
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getTotalRevenue = () => {
        return orders.reduce((sum, order) => sum + order.amount, 0);
    };

    // Page de chargement centrée
    if (loading) {
        return (
            <div className="flex-1 min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <Loading />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex-1 min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
                        <p className="text-slate-600 mt-1">Track and manage all customer orders</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg hover:border-blue-500 hover:text-blue-700 transition-colors">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex-1 p-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-slate-600">Total Orders</div>
                            <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{orders.length}</div>
                        <div className="text-sm text-slate-500 mt-2">All time</div>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-slate-600">Pending</div>
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="text-3xl font-bold text-amber-700">{orders.filter(o => o.status === 'pending').length}</div>
                        <div className="text-sm text-slate-500 mt-2">Require action</div>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-slate-600">Revenue</div>
                            <DollarSign className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">{currency}{getTotalRevenue().toFixed(2)}</div>
                        <div className="text-sm text-slate-500 mt-2">This month</div>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-slate-600">Avg. Order</div>
                            <Package className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-3xl font-bold text-purple-700">{currency}{(getTotalRevenue() / orders.length || 0).toFixed(2)}</div>
                        <div className="text-sm text-slate-500 mt-2">Per order</div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search orders by ID, customer, or product..."
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            />
                        </div>
                        
                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-slate-600" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label} ({option.count})
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="amount-high">Amount: High to Low</option>
                                <option value="amount-low">Amount: Low to High</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                    onChange={handleSelectAll}
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-slate-700">
                                    {selectedOrders.length > 0 
                                        ? `${selectedOrders.length} selected` 
                                        : `${filteredOrders.length} orders`
                                    }
                                </span>
                            </div>
                            
                            {selectedOrders.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                        Mark as Processing
                                    </button>
                                    <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 transition-colors text-sm font-medium">
                                        Export Selected
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="divide-y divide-slate-200">
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-16">
                                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No orders found</h3>
                                <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Order Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedOrders.includes(order.id)}
                                                            onChange={() => handleSelectOrder(order.id)}
                                                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                                        />
                                                        <h3 className="font-semibold text-slate-900">Order #{order.id}</h3>
                                                        {getStatusBadge(order.status)}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-slate-600">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(order.orderDate)}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <User className="w-4 h-4" />
                                                            {order.address.fullName}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-blue-900">
                                                        {currency}{order.amount.toFixed(2)}
                                                    </div>
                                                    <div className="text-sm text-slate-600">{order.items.length} items</div>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                {order.items.slice(0, 2).map((item, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                                        <div className="w-12 h-12 bg-white rounded border border-slate-200 flex items-center justify-center">
                                                            <Package className="w-6 h-6 text-slate-400" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-slate-900">{item.product.name}</div>
                                                            <div className="text-sm text-slate-600">Qty: {item.quantity} × {currency}{item.product.offerPrice}</div>
                                                        </div>
                                                        <div className="font-semibold text-slate-900">
                                                            {currency}{(item.product.offerPrice * item.quantity).toFixed(2)}
                                                        </div>
                                                    </div>
                                                ))}
                                                {order.items.length > 2 && (
                                                    <div className="p-3 bg-blue-50 rounded-lg text-blue-700 font-medium">
                                                        +{order.items.length - 2} more items
                                                    </div>
                                                )}
                                            </div>

                                            {/* Customer & Shipping */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <User className="w-4 h-4 text-blue-600" />
                                                        <span className="text-sm font-medium text-slate-900">Customer</span>
                                                    </div>
                                                    <div className="text-sm text-slate-700">{order.address.fullName}</div>
                                                    <div className="text-sm text-slate-600">{order.customerEmail}</div>
                                                </div>
                                                
                                                <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <MapPin className="w-4 h-4 text-purple-600" />
                                                        <span className="text-sm font-medium text-slate-900">Shipping</span>
                                                    </div>
                                                    <div className="text-sm text-slate-700">{order.address.city}, {order.address.state}</div>
                                                    <div className="text-sm text-slate-600">{order.address.area}</div>
                                                </div>
                                                
                                                <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Truck className="w-4 h-4 text-emerald-600" />
                                                        <span className="text-sm font-medium text-slate-900">Delivery</span>
                                                    </div>
                                                    <div className="text-sm text-slate-700">Est: {formatDate(order.estimatedDelivery)}</div>
                                                    <div className="text-sm text-slate-600">Phone: {order.address.phoneNumber}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="lg:w-48 space-y-3">
                                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </button>
                                            
                                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:border-blue-500 hover:text-blue-700 transition-colors">
                                                <Printer className="w-4 h-4" />
                                                Print Invoice
                                            </button>
                                            
                                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                                More Actions
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredOrders.length > 0 && (
                        <div className="px-6 py-4 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-slate-600">
                                    Showing 1-{filteredOrders.length} of {orders.length} orders
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1.5 border border-slate-300 rounded hover:border-slate-400 disabled:opacity-50">
                                        Previous
                                    </button>
                                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded">1</button>
                                    <button className="px-3 py-1.5 border border-slate-300 rounded hover:border-slate-400">2</button>
                                    <button className="px-3 py-1.5 border border-slate-300 rounded hover:border-slate-400">3</button>
                                    <button className="px-3 py-1.5 border border-slate-300 rounded hover:border-slate-400">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer toujours en bas */}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default Orders;