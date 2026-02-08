import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  PlusCircle,
  List,
  Package
} from "lucide-react";

const SideBar = () => {
    const pathname = usePathname();
    
    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: PlusCircle },
        { name: 'Product List', path: '/seller/product-list', icon: List },
        { name: 'Orders', path: '/seller/orders', icon: Package },
    ];

    return (
        <div className='md:w-64 w-20 min-h-screen bg-white border-r border-slate-200 py-6'>
            <div className="space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    
                    return (
                        <Link href={item.path} key={item.name} passHref>
                            <div className={`
                                flex items-center gap-3 p-3 mx-2 rounded-lg transition-all duration-200
                                ${isActive 
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' 
                                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                                }
                            `}>
                                <Icon className="w-5 h-5" />
                                <span className="hidden md:block font-medium text-sm">
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SideBar;