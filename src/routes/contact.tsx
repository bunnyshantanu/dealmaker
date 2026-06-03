import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact us — DealChain" },
      { name: "description", content: "Talk to the DealChain team. Private beta access, partnerships and broker onboarding." },
      { property: "og:title", content: "Contact DealChain" },
      { property: "og:description", content: "Private beta access, partnerships and broker onboarding." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "broker", message: "" });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setSent(true);
    toast.success("Message received. We'll be in touch within 24 hours.");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="size-8 rounded-[10px] bg-foreground text-background grid place-items-center font-display font-semibold">DC</div>
            <span className="font-display text-[17px]">DealChain</span>
          </Link>
          <Link to="/" className="text-[13px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
            <ArrowLeft className="size-3.5" /> Back home
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-[1fr_1.1fr] gap-14">
        {/* Left */}
        <div>
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">Contact us</div>
          <h1 className="mt-3 font-display text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]">
            Let's get you on the floor.
          </h1>
            <p className="mt-5 text-[16px] text-muted-foreground max-w-md leading-relaxed">
              Whether you're a broker or a direct client — tell us a bit about yourself and we'll set you up on the deal floor.
            </p>

          <div className="mt-10 space-y-5">
            {[
              { icon: Mail,  label: "Email",  value: "hello@dealchain.in" },
              { icon: Phone, label: "Phone",  value: "+91 98100 00000" },
              { icon: MapPin, label: "Region", value: "Delhi NCR · India" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="size-10 rounded-lg border border-border grid place-items-center shrink-0">
                  <c.icon className="size-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="text-[15px] mt-0.5">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="rounded-3xl border border-border bg-card p-7 md:p-9">
          {sent ? (
            <div className="text-center py-12">
              <div className="size-14 rounded-full bg-foreground text-background grid place-items-center mx-auto">
                <Check className="size-6" />
              </div>
              <h2 className="mt-6 font-display text-[28px]">Message received</h2>
              <p className="mt-2 text-[14px] text-muted-foreground max-w-sm mx-auto">
                We'll reach out within 24 hours. In the meantime, take the floor for a spin.
              </p>
              <div className="mt-6 flex gap-2 justify-center">
                <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} className="h-11" placeholder="Aman Kapoor" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="h-11" placeholder="+91 98100 00000" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="h-11" placeholder="you@company.com" />
              </div>
              <div className="space-y-1.5">
                <Label>I am a</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ v: "broker", l: "Broker" }, { v: "client", l: "Direct Client" }].map((r) => (
                    <button
                      key={r.v}
                      type="button"
                      onClick={() => update("role", r.v)}
                      className={
                        "py-2.5 rounded-lg border text-[13px] transition-colors " +
                        (form.role === r.v
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background hover:border-foreground/40")
                      }
                    >
                      {r.l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={5}
                  placeholder="Tell us about your network and where you operate…"
                />
              </div>
              <Button type="submit" className="w-full h-11 rounded-full bg-foreground text-background hover:bg-foreground/90">
                Send message
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                We respect your inbox. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}