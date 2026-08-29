"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useClerk, UserButton } from "@clerk/nextjs";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const links = [
  { href: "/", label: "Home" }, { href: "/all-products", label: "Shop" },
  { href: "/about", label: "Our story" }, { href: "/contact", label: "Help" },
];

export default function Navbar() {
  const { isSeller, router, user, getCartCount } = useAppContext();
  const { openSignIn } = useClerk();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const submitSearch = (event) => { event.preventDefault(); if (!query.trim()) return; router.push(`/all-products?search=${encodeURIComponent(query.trim())}`); setQuery(""); setOpen(false); };
  const count = getCartCount();

  return <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" aria-label="ShopFlow home" className="flex items-center"><Image className="h-auto w-32" src={assets.logo} width={144} height={40} alt="ShopFlow" priority /></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
        {links.map((link) => <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-brand-50 hover:text-brand-700">{link.label}</Link>)}
        {isSeller && <Link href="/seller" className="rounded-md px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">Seller space</Link>}
      </nav>
      <div className="hidden items-center gap-3 md:flex">
        <form onSubmit={submitSearch} className="relative w-56 lg:w-64"><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="pr-10" aria-label="Search products" /><button type="submit" aria-label="Submit search" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink"><Search className="h-4 w-4" /></button></form>
        <Link href="/cart" aria-label={`Bag, ${count} items`} className="relative rounded-md p-2 text-ink hover:bg-brand-50"><ShoppingCart className="h-5 w-5" />{count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-bold text-white">{count}</span>}</Link>
        {user ? <UserButton afterSignOutUrl="/" /> : <Button onClick={openSignIn} size="sm"><ShoppingBag className="h-4 w-4" />Sign in</Button>}
      </div>
      <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-md p-2 text-ink hover:bg-brand-50 md:hidden">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="border-t border-line bg-surface px-4 py-4 md:hidden">
      <form onSubmit={submitSearch} className="mb-4 flex gap-2"><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" /><Button type="submit" aria-label="Submit search" size="md"><Search className="h-4 w-4" /></Button></form>
      <nav aria-label="Mobile navigation" className="grid gap-1">{links.map((link) => <Link key={link.href} onClick={() => setOpen(false)} href={link.href} className="rounded-md px-3 py-2.5 font-medium text-ink hover:bg-brand-50">{link.label}</Link>)}<Link onClick={() => setOpen(false)} href="/cart" className="flex items-center gap-2 rounded-md px-3 py-2.5 font-medium text-ink hover:bg-brand-50"><ShoppingCart className="h-4 w-4" />Bag ({count})</Link>{isSeller && <Link onClick={() => setOpen(false)} href="/seller" className="rounded-md px-3 py-2.5 font-medium text-ink hover:bg-brand-50">Seller space</Link>}</nav>
    </div>}
  </header>;
}
