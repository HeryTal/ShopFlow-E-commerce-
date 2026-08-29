"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderSummary from "@/components/OrderSummary";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { getCartCount } = useAppContext();
  return <><Navbar /><main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_24rem]"><section><p className="text-sm font-semibold uppercase tracking-widest text-brand-700">Checkout</p><h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">A few final details.</h1><p className="mt-3 max-w-xl text-muted">Choose your delivery address and review your order before confirming.</p><div className="mt-8 rounded-lg border border-line bg-surface p-6 shadow-card"><h2 className="font-semibold text-ink">Your bag</h2><p className="mt-2 text-sm text-muted">{getCartCount()} item{getCartCount() === 1 ? "" : "s"} ready to check out.</p><Link href="/cart" className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-600">Edit your bag</Link></div></section><aside><OrderSummary /></aside></div></main><Footer /></>;
}
