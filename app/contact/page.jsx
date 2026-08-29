"use client";

import { useState } from "react";
import { Clock3, Mail, MessageCircle, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

const options = [
  { icon: MessageCircle, title: "Questions about an order?", text: "Tell us what you need and we’ll point you in the right direction." },
  { icon: Mail, title: "Need product advice?", text: "We’re happy to help you find a good fit for your routine." },
  { icon: Clock3, title: "Here when you need us", text: "Our support team usually replies within one business day." },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event) => { event.preventDefault(); if (!event.currentTarget.reportValidity()) return; setSent(true); };
  return <><Navbar /><main>
    <section className="border-b border-line bg-surface px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Help</p><h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">How can we help?</h1><p className="mt-5 text-lg leading-8 text-muted">Whether it’s an order, a product, or a simple question, our team is here to make things easy.</p></div></section>
    <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]"><aside><h2 className="text-2xl font-bold tracking-tight text-ink">Start a conversation.</h2><p className="mt-3 leading-7 text-muted">Use the form and we’ll get back to you as soon as possible.</p><div className="mt-8 space-y-4">{options.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Icon className="h-4 w-4" /></div><div><h3 className="font-semibold text-ink">{title}</h3><p className="mt-1 text-sm leading-6 text-muted">{text}</p></div></div>)}</div></aside>
      <Card className="p-6 sm:p-8">{sent ? <div className="py-12 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Send className="h-5 w-5" /></div><h2 className="mt-5 text-2xl font-bold text-ink">Message received.</h2><p className="mt-2 text-muted">Thanks for getting in touch. We’ll be with you shortly.</p><Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>Send another message</Button></div> : <form onSubmit={submit}><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold text-ink">First name<Input required name="firstName" autoComplete="given-name" placeholder="Alex" /></label><label className="grid gap-2 text-sm font-semibold text-ink">Last name<Input required name="lastName" autoComplete="family-name" placeholder="Morgan" /></label></div><label className="mt-5 grid gap-2 text-sm font-semibold text-ink">Email<Input required type="email" name="email" autoComplete="email" placeholder="alex@example.com" /></label><label className="mt-5 grid gap-2 text-sm font-semibold text-ink">What can we help with?<textarea required name="message" rows="5" placeholder="Tell us a little more…" className="w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" /></label><Button type="submit" className="mt-6"><Send className="h-4 w-4" />Send message</Button></form>}</Card></div></section>
  </main><Footer /></>;
}
