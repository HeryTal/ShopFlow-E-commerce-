import Link from "next/link";
import { ArrowRight, Heart, Leaf, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: Sparkles, title: "Chosen with care", text: "We look for useful, well-made pieces that make everyday routines feel a little better." },
  { icon: Heart, title: "People first", text: "Clear information, fair choices, and support that feels human from browse to delivery." },
  { icon: Leaf, title: "Less, but better", text: "A focused collection means less noise and more confidence in what you bring home." },
];

export default function AboutPage() {
  return <><Navbar /><main>
    <section className="border-b border-line bg-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Our story</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">For the things that make a place feel like yours.</h1>
        <p className="mt-6 text-lg leading-8 text-muted">ShopFlow is a considered marketplace for everyday living. We bring together useful finds, thoughtful details, and a shopping experience that stays refreshingly simple.</p>
      </div>
    </section>
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Why we started</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">Good shopping should feel calm.</h2><div className="mt-5 space-y-4 leading-7 text-muted"><p>Too many choices can turn a simple purchase into a chore. ShopFlow was created around a different idea: make it easier to discover products worth keeping.</p><p>Our collection is designed to evolve with real life — new spaces, new routines, small moments of comfort, and the people you share them with.</p></div></div>
        <div className="rounded-lg border border-line bg-brand-50 p-8 sm:p-10"><p className="text-2xl font-semibold leading-9 text-ink">“A more thoughtful way to find what you need — and a few things you’ll love.”</p><p className="mt-6 text-sm font-semibold text-brand-700">The ShopFlow team</p></div>
      </div>
    </section>
    <section className="border-y border-line bg-surface px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">What guides us</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">Simple principles, every day.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{values.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-lg border border-line p-6"><Icon className="h-5 w-5 text-brand-700" aria-hidden="true" /><h3 className="mt-5 font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></article>)}</div></div></section>
    <section className="px-4 py-16 text-center sm:px-6 lg:px-8"><h2 className="text-3xl font-bold tracking-tight text-ink">Find something for your everyday.</h2><Link href="/all-products" className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700">Explore ShopFlow <ArrowRight className="h-4 w-4" /></Link></section>
  </main><Footer /></>;
}
