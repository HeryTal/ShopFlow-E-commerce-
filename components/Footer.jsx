import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { assets } from "@/assets/assets";

const navigation = [{ href: "/all-products", label: "Shop" }, { href: "/about", label: "Our story" }, { href: "/contact", label: "Contact" }];
const account = [{ href: "/profile", label: "Profile" }, { href: "/my-orders", label: "Orders" }, { href: "/cart", label: "Bag" }];

export default function Footer() {
  return <footer className="mt-16 border-t border-line bg-surface">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
      <div className="md:col-span-2 lg:col-span-1"><Link href="/" aria-label="ShopFlow home"><Image src={assets.logo} alt="ShopFlow" width={144} height={40} className="mb-4 w-32" /></Link><p className="max-w-xs text-sm leading-6 text-muted">Thoughtfully chosen everyday essentials, delivered simply.</p><div className="mt-5 flex gap-2"><a className="rounded-md p-2 text-muted hover:bg-brand-50 hover:text-brand-700" href="mailto:hello@shopflow.com" aria-label="Email ShopFlow"><Mail className="h-4 w-4" /></a><a className="rounded-md p-2 text-muted hover:bg-brand-50 hover:text-brand-700" href="https://instagram.com" aria-label="ShopFlow on Instagram"><Instagram className="h-4 w-4" /></a><a className="rounded-md p-2 text-muted hover:bg-brand-50 hover:text-brand-700" href="/contact" aria-label="Contact ShopFlow"><MessageCircle className="h-4 w-4" /></a></div></div>
      <div><h2 className="text-sm font-semibold text-ink">Explore</h2><ul className="mt-4 space-y-3">{navigation.map((item) => <li key={item.href}><Link className="text-sm text-muted hover:text-brand-700" href={item.href}>{item.label}</Link></li>)}</ul></div>
      <div><h2 className="text-sm font-semibold text-ink">Your account</h2><ul className="mt-4 space-y-3">{account.map((item) => <li key={item.href}><Link className="text-sm text-muted hover:text-brand-700" href={item.href}>{item.label}</Link></li>)}</ul></div>
      <div><h2 className="text-sm font-semibold text-ink">Need a hand?</h2><p className="mt-4 flex gap-2 text-sm leading-6 text-muted"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />Online support, wherever you are.</p><Link href="/contact" className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-600">Contact support</Link></div>
    </div>
    <div className="border-t border-line"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8"><span>© {new Date().getFullYear()} ShopFlow. All rights reserved.</span><span>Secure checkout • Easy returns</span></div></div>
  </footer>;
}
