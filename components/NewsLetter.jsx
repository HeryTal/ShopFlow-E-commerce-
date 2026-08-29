"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => { event.preventDefault(); if (!event.currentTarget.reportValidity()) return; setSubmitted(true); };
  return <section className="px-4 py-16" aria-labelledby="newsletter-title">
    <Card className="mx-auto max-w-3xl p-6 text-center sm:p-10">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700"><Mail className="h-5 w-5" aria-hidden="true" /></div>
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">The ShopFlow note</p>
      <h2 id="newsletter-title" className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">A little inspiration, now and then.</h2>
      <p className="mx-auto mt-3 max-w-xl text-muted">New finds and thoughtful offers. No noise, and you can leave whenever you like.</p>
      {submitted ? <p className="mt-6 rounded-md bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700" role="status">Thanks — you’re on the list.</p> : <form onSubmit={submit} className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"><Input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-label="Email address" /><Button type="submit" className="shrink-0">Join the list</Button></form>}
    </Card>
  </section>;
}
