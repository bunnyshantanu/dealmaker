import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/store/useAuth";
import { useStore } from "@/store/useStore";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/seller")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const user = useAuth.getState().user;
      if (!user || user.userType !== "seller") throw redirect({ to: "/app" });
    }
  },
  component: SellerLanding,
  head: () => ({
    meta: [
      { title: "Sell Property — DealChain" },
      { name: "description", content: "Post your property for sale and connect with serious buyers on DealChain." },
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

// Live sellers showcase
const liveSellers = [
  { name: "Priya Singh", property: "600 Sq Yard Villa", location: "Defence Colony", expectation: "₹1.95 Cr", status: "Active" },
  { name: "Karan Bhatia", property: "250 Sq Yard Apartment", location: "Saket", expectation: "₹26 Lakhs", status: "Active" },
  { name: "Amit Verma", property: "1,200 Sq Yard Plot", location: "Anand Niketan", expectation: "₹3.2 Cr", status: "Active" },
  { name: "Neha Kapoor", property: "400 Sq Yard Builder Floor", location: "Greater Kailash", expectation: "₹1.5 Cr", status: "Active" },
] as const;

// Live buyers
const liveBuyers = [
  { name: "Rohan Mehta", looking: "Builder Floor 2400+ sq yards", budget: "₹60-75 Cr", location: "Greater Kailash", status: "Serious" },
  { name: "Naina Arora", looking: "Apartment 1300-1700 sq yards", budget: "₹20-28 Cr", location: "Saket", status: "Closing in 30 days" },
  { name: "Vikram Sethi", looking: "Villa 6000+ sq yards", budget: "₹1.8+ Cr", location: "Vasant Vihar", status: "Cash Ready" },
  { name: "Sahil Kapoor", looking: "Premium Builder Floor", budget: "₹1.2 Cr+", location: "South Delhi", status: "HNI Investor" },
] as const;

function SellerLanding() {
  const { user } = useAuth();
  const { contacts } = useStore();
  const [slideSellers, setSlideSellers] = useState(0);
  const [slideBuyers, setSlideBuyers] = useState(0);
  const perView = 2;
  const maxSlideSellers = Math.max(0, liveSellers.length - perView);
  const maxSlideBuyers = Math.max(0, liveBuyers.length - perView);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/"><Logo /></Link>
          <nav className="hidden md:flex items-center gap-9 text-[14px] text-muted-foreground">
            <a href="#opportunities" className="hover:text-foreground transition-colors">Buyer opportunities</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Market activity</a>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="h-9 rounded-full px-5 bg-foreground text-background hover:bg-foreground/90">
              <Link to="/app">Dashboard <ArrowRight className="size-3.5 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO SECTION — Property slider */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-20">
          <div className="text-center mb-12">
            <h1 className="font-display text-[56px] md:text-[96px] leading-[0.96] tracking-[-0.03em]">
              Post & Sell.<br />Get Matched.
            </h1>
            <p className="mt-8 text-[17px] md:text-[19px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Post your property in under 20 seconds. Connect with serious buyers from our network. 
              Get multiple inquiries and close deals faster.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Button asChild className="h-12 px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[15px]">
                <Link to="/inventory">Post Your Property <ArrowRight className="size-4 ml-1" /></Link>
              </Button>
              <Button variant="outline" asChild className="h-12 px-7 rounded-full text-[15px]">
                <Link to="/app">View Dashboard</Link>
              </Button>
            </div>
          </div>

          {/* Properties Slider */}
          <div className="mt-16">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-[24px] font-display">Recent seller listings</h2>
                <p className="text-[14px] text-muted-foreground mt-1">Properties actively being sold right now</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSlideSellers((s) => Math.max(0, s - 1))}
                  disabled={slideSellers === 0}
                  className="size-10 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-secondary transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => setSlideSellers((s) => Math.min(maxSlideSellers, s + 1))}
                  disabled={slideSellers >= maxSlideSellers}
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
                style={{ transform: `translateX(calc(-${slideSellers} * (100% / ${perView} + 20px)))` }}
              >
                {liveSellers.map((listing, i) => (
                  <div
                    key={i}
                    className="shrink-0 rounded-2xl border border-border bg-card p-6 hover:border-foreground/30 transition-colors"
                    style={{ width: `calc((100% - ${(perView - 1) * 20}px) / ${perView})` }}
                  >
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                      <Home className="size-3.5" />
                      Selling
                    </div>
                    <div className="font-display text-[18px] leading-tight mb-2">{listing.property}</div>
                    <div className="text-[13px] text-muted-foreground mb-1">{listing.location}</div>
                    <div className="text-[13px] font-medium text-foreground mb-3">{listing.expectation}</div>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/15 text-green-600 text-[11px] font-medium">● {listing.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2-COLUMN SECTION — Sellers vs Buyers */}
      <section id="opportunities" className="border-b border-border bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Live Sellers */}
            <div>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="text-[24px] font-display">Other active sellers</h2>
                  <p className="text-[13px] text-muted-foreground mt-1">See who else is selling</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSlideSellers((s) => Math.max(0, s - 1))}
                    disabled={slideSellers === 0}
                    className="size-8 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>
                  <button
                    onClick={() => setSlideSellers((s) => Math.min(maxSlideSellers, s + 1))}
                    disabled={slideSellers >= maxSlideSellers}
                    className="size-8 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-background transition-colors"
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {liveSellers.slice(slideSellers, slideSellers + 2).map((seller, i) => (
                  <div key={i} className="rounded-xl border border-border p-4 hover:border-foreground/30 transition-colors bg-background">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="text-[13px] font-medium">{seller.name}</div>
                      <div className="px-2 py-1 rounded-full bg-green-500/15 text-green-600 text-[10px] font-semibold">Active</div>
                    </div>
                    <p className="text-[12px] text-muted-foreground mb-2">{seller.property} · {seller.location}</p>
                    <p className="text-[13px] font-medium text-foreground">{seller.expectation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Buyers */}
            <div>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="text-[24px] font-display">Active buyers looking</h2>
                  <p className="text-[13px] text-muted-foreground mt-1">Match your property with them</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSlideBuyers((s) => Math.max(0, s - 1))}
                    disabled={slideBuyers === 0}
                    className="size-8 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>
                  <button
                    onClick={() => setSlideBuyers((s) => Math.min(maxSlideBuyers, s + 1))}
                    disabled={slideBuyers >= maxSlideBuyers}
                    className="size-8 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-background transition-colors"
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {liveBuyers.slice(slideBuyers, slideBuyers + 2).map((buyer, i) => (
                  <div key={i} className="rounded-xl border border-border p-4 hover:border-foreground/30 transition-colors bg-background">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="text-[13px] font-medium">{buyer.name}</div>
                      <div className="px-2 py-1 rounded-full bg-blue-500/15 text-blue-600 text-[10px] font-semibold">{buyer.status}</div>
                    </div>
                    <p className="text-[12px] text-muted-foreground mb-2">{buyer.looking}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-foreground">{buyer.budget}</span>
                      <span className="text-[12px] text-muted-foreground">— {buyer.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot opportunities section */}
      <section id="stats" className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">How you benefit</div>
            <h2 className="mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em]">
              Why sellers choose DealChain
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Serious buyers only", desc: "Verified buyers with real intent and capital" },
              { icon: "⚡", title: "Fast matching", desc: "Get buyer inquiries within hours of posting" },
              { icon: "🤝", title: "Broker support", desc: "Our team helps negotiate and close deals" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-background p-8 text-center hover:border-foreground/30 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-[18px] mb-2">{item.title}</h3>
                <p className="text-[13px] text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h2 className="font-display text-[44px] md:text-[64px] leading-[1.02] tracking-[-0.025em]">
            Post & Sell.<br />Get Matched.
          </h2>
          <p className="mt-6 text-[16px] text-muted-foreground max-w-lg mx-auto">
            Join 980+ active sellers on DealChain. Post your property and get serious buyer inquiries today.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button asChild className="h-12 px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[15px]">
              <Link to="/inventory">Post Your Property <ArrowRight className="size-4 ml-1" /></Link>
            </Button>
            <Button variant="outline" asChild className="h-12 px-7 rounded-full text-[15px]">
              <Link to="/app">Go to Dashboard</Link>
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
