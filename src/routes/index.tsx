import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/store/useAuth";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const user = useAuth.getState().user;
      if (user) {
        if (user.userType === "seller") throw redirect({ to: "/hello" });
        throw redirect({ to: "/app" });
      }
    }
  },
  component: Landing,
  head: () => ({
    meta: [
      { title: "DealChain — Stop chasing. Start closing." },
      { name: "description", content: "Post your requirement or inventory in under 20 seconds. DealChain matches and re-matches deals continuously across a serious real estate network." },
      { property: "og:title", content: "DealChain" },
      { property: "og:description", content: "Stop chasing. Start closing." },
    ],
  }),
});

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 rounded-[10px] bg-foreground text-background grid place-items-center font-display font-semibold text-[13px]">DC</div>
      <span className="font-display text-[18px] tracking-tight">DealChain</span>
    </div>
  );
}

// Anonymized hot opportunities — no addresses, no owner names, no phone, no price.
const hotCards = [
  { kind: "Hot Property", title: "400 Sq Yard Builder Floor", area: "Saket", tag: "Below market" },
  { kind: "Hot Buyer", title: "Immediate buyer seeking premium property", area: "Vasant Vihar", tag: "Closing in 30 days" },
  { kind: "Hot Property", title: "250 Sq Yard Apartment", area: "Greater Kailash", tag: "Off-market" },
  { kind: "Hot Buyer", title: "HNI investor — 5+ floors wanted", area: "South Delhi", tag: "Cash ready" },
  { kind: "Hot Property", title: "600 Sq Yard Villa", area: "Defence Colony", tag: "Quick close" },
  { kind: "Hot Buyer", title: "Builder seeking collaboration", area: "Panchsheel Park", tag: "Trading possible" },
  { kind: "Hot Property", title: "1,000 Sq Yard Plot", area: "Anand Niketan", tag: "Resale" },
] as const;

function Landing() {
  const { user } = useAuth();
  const [slide, setSlide] = useState(0);
  const perView = 3;
  const maxSlide = Math.max(0, hotCards.length - perView);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/"><Logo /></Link>
          <nav className="hidden md:flex items-center gap-9 text-[14px] text-muted-foreground">
{user?.userType === "seller" && (
  <Link
    to="/hello"
    className="hover:text-foreground transition-colors"
  >
    Hello
  </Link>
)}            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#hot" className="hover:text-foreground transition-colors">Live opportunities</a>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="h-9 rounded-full px-5 bg-foreground text-background hover:bg-foreground/90">
              {user ? (
                <Link to="/app">Dashboard <ArrowRight className="size-3.5 ml-1" /></Link>
              ) : (
                <Link to="/login">Sign in <ArrowRight className="size-3.5 ml-1" /></Link>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-20 text-center">
          <h1 className="font-display text-[56px] md:text-[96px] leading-[0.96] tracking-[-0.03em]">
            Stop chasing.<br />Start closing.
          </h1>
          <p className="mt-8 text-[17px] md:text-[19px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Post your requirement or inventory in under 20 seconds. Our system continuously identifies
            relevant opportunities, re-matches them as the network grows, and helps move deals toward closure.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button asChild className="h-12 px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[15px]">
              <Link to="/login">Open Deal Floor <ArrowRight className="size-4 ml-1" /></Link>
            </Button>
            <Button variant="outline" asChild className="h-12 px-7 rounded-full text-[15px]">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUST & SCALE */}
      <section className="border-b border-border bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-10">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">Live across the network</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { k: "1,240+", v: "Active buyers" },
              { k: "980+",   v: "Active sellers" },
              { k: "5,400+", v: "Active brokers" },
              { k: "3,200+", v: "Active properties" },
              { k: "184",    v: "Deals in progress" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-border bg-background p-5 text-center">
                <div className="font-display text-[26px] md:text-[30px] tracking-tight">{s.k}</div>
                <div className="text-[12px] text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOT OPPORTUNITIES */}
      <section id="hot" className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">Hot opportunities</div>
              <h2 className="mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em]">
                A glimpse of what's moving today.
              </h2>
              <p className="mt-3 text-[14px] text-muted-foreground max-w-md">
                Details are kept private. Sign in to see full matches in your zone.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSlide((s) => Math.max(0, s - 1))}
                disabled={slide === 0}
                className="size-10 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-secondary transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => setSlide((s) => Math.min(maxSlide, s + 1))}
                disabled={slide >= maxSlide}
                className="size-10 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-secondary transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(calc(-${slide} * (100% / ${perView} + 0px)))` }}
            >
              {hotCards.map((c, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-2xl border border-border bg-card p-6 hover:border-foreground/30 transition-colors"
                  style={{ width: `calc((100% - ${(perView - 1) * 20}px) / ${perView})` }}
                >
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {c.kind === "Hot Property" ? <Flame className="size-3.5" /> : <Users className="size-3.5" />}
                    {c.kind}
                  </div>
                  <div className="font-display text-[20px] mt-4 leading-tight">{c.title}</div>
                  <div className="text-[14px] text-muted-foreground mt-1.5">{c.area}</div>
                  <div className="mt-5 inline-flex items-center px-2.5 py-1 rounded-full bg-secondary text-[11px]">{c.tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SIMPLE PROCESS */}
      <section id="how" className="border-b border-border bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">How it works</div>
            <h2 className="mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em]">
              Five steps. One closure.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { n: "01", t: "Register" },
              { n: "02", t: "Post requirement or inventory" },
              { n: "03", t: "Get matches" },
              { n: "04", t: "Connect" },
              { n: "05", t: "Close deals" },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-background p-6 text-center">
                <div className="text-[11px] tabular-nums text-muted-foreground">{s.n}</div>
                <div className="font-display text-[18px] mt-3 leading-tight">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h2 className="font-display text-[44px] md:text-[64px] leading-[1.02] tracking-[-0.025em]">
            Stop chasing.<br />Start closing.
          </h2>
          <p className="mt-6 text-[16px] text-muted-foreground max-w-lg mx-auto">
            Spend 20 seconds posting a listing — the network does the rest.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button asChild className="h-12 px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[15px]">
              <Link to="/login">Open Deal Floor <ArrowRight className="size-4 ml-1" /></Link>
            </Button>
            <Button variant="outline" asChild className="h-12 px-7 rounded-full text-[15px]">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 flex flex-wrap items-center justify-between gap-4 text-[12px] text-muted-foreground">
          <Logo />
          <div>© {new Date().getFullYear()} DealChain · All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}