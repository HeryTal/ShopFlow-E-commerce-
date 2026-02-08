'use client'
import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

// Import des icônes Lucide React
import { 
  Package,
  Plus,
  Edit,
  Eye,
  Trash2,
  Filter,
  Search,
  MoreVertical,
  TrendingUp,
  Star,
  Tag,
  Grid,
  List,
  ChevronDown,
  Download,
  AlertCircle
} from "lucide-react";

const ProductList = () => {
  const { router, currency } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    { id: "all", label: "All Categories", count: productsDummyData.length },
    { id: "electronics", label: "Electronics", count: 4 },
    { id: "audio", label: "Audio", count: 3 },
    { id: "gaming", label: "Gaming", count: 2 },
    { id: "computers", label: "Computers", count: 3 },
    { id: "accessories", label: "Accessories", count: 2 },
  ];

  const fetchSellerProduct = async () => {
    // Simulate API call
    setTimeout(() => {
      const productsWithStats = productsDummyData.map((product, index) => ({
        ...product,
        id: `PROD-${Date.now() + index}`,
        stock: Math.floor(Math.random() * 100) + 10,
        sales: Math.floor(Math.random() * 500),
        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
        lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        status: index % 5 === 0 ? "draft" : "published",
      }));
      setProducts(productsWithStats);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchSellerProduct();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "published": return "bg-emerald-100 text-emerald-800";
      case "draft": return "bg-amber-100 text-amber-800";
      case "out_of_stock": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };

  const getTotalValue = () => {
    return filteredProducts.reduce((sum, product) => sum + (product.offerPrice * product.stock), 0);
  };

  const getLowStockProducts = () => {
    return filteredProducts.filter(product => product.stock < 20).length;
  };

  if (loading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Product Inventory</h1>
            <p className="text-slate-600 mt-1">Manage your products and inventory</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/seller/add-product')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 hover:shadow-lg transition-all font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      <main className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate-600">Total Products</div>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{filteredProducts.length}</div>
            <div className="text-sm text-slate-500 mt-2">Active listings</div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate-600">Total Value</div>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-emerald-700">{currency}{getTotalValue().toFixed(2)}</div>
            <div className="text-sm text-slate-500 mt-2">Inventory value</div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate-600">Low Stock</div>
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-bold text-amber-700">{getLowStockProducts()}</div>
            <div className="text-sm text-slate-500 mt-2">Need restocking</div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate-600">Avg. Rating</div>
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-700">
              {(filteredProducts.reduce((sum, p) => sum + parseFloat(p.rating), 0) / filteredProducts.length || 0).toFixed(1)}
            </div>
            <div className="text-sm text-slate-500 mt-2">Customer satisfaction</div>
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
                placeholder="Search products by name or description..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg ${viewMode === "grid" ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg ${viewMode === "list" ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Table/Grid */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  {selectedProducts.length > 0 
                    ? `${selectedProducts.length} selected` 
                    : `${filteredProducts.length} products`
                  }
                </span>
              </div>
              
              {selectedProducts.length > 0 && (
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Publish Selected
                  </button>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 transition-colors text-sm font-medium">
                    Export Selected
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Content */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => router.push('/seller/add-product')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all font-semibold"
              >
                Add Your First Product
              </button>
            </div>
          ) : viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    {/* Product Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                        />
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </div>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg">
                        <MoreVertical className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="w-full h-48 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg mb-4 p-4 flex items-center justify-center">
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        width={300}
                        height={300}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="mb-4">
                      <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-700">{product.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-blue-900">{currency}{product.offerPrice}</div>
                          {product.price && (
                            <div className="text-sm text-slate-400 line-through">{currency}{product.price}</div>
                          )}
                        </div>
                        <div className="text-sm text-slate-600">
                          Stock: <span className={`font-semibold ${product.stock < 20 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {product.stock}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="p-2.5 border border-slate-300 text-slate-700 rounded-lg hover:border-blue-500 hover:text-blue-700 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 border border-slate-300 text-red-600 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="divide-y divide-slate-200">
              {filteredProducts.map((product) => (
                <div key={product.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          />
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-2 flex items-center justify-center">
                              <Image
                                src={product.image[0]}
                                alt={product.name}
                                className="w-full h-full object-contain"
                                width={64}
                                height={64}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{product.name}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                                  {product.status}
                                </span>
                                <span className="text-sm text-slate-600">{product.category}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  <span className="text-xs">{product.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-900">
                            {currency}{product.offerPrice}
                          </div>
                          <div className="text-sm text-slate-600">Stock: {product.stock}</div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                          <div className="text-sm font-medium text-slate-900 mb-1">Sales</div>
                          <div className="text-lg font-semibold text-blue-700">{product.sales} units</div>
                        </div>
                        
                        <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                          <div className="text-sm font-medium text-slate-900 mb-1">Last Updated</div>
                          <div className="text-sm text-slate-700">
                            {new Date(product.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
                          <div className="text-sm font-medium text-slate-900 mb-1">Inventory Value</div>
                          <div className="text-lg font-semibold text-emerald-700">
                            {currency}{(product.offerPrice * product.stock).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="md:w-48 space-y-3">
                      <button 
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Product
                      </button>
                      
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:border-blue-500 hover:text-blue-700 transition-colors">
                        <Edit className="w-4 h-4" />
                        Edit Product
                      </button>
                      
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 text-red-600 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing 1-{filteredProducts.length} of {products.length} products
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

      <Footer />
    </div>
  );
};

export default ProductList;