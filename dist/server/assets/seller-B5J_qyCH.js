import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { B as Button } from "./button-Cz8PAkJh.js";
import { ArrowRight, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useState } from "react";
import { u as useAuth } from "./router-CxU_Q1IW.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "sonner";
import "zustand";
import "zustand/middleware";
function Logo() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: "size-8 rounded-[10px] bg-foreground text-background grid place-items-center font-display font-semibold text-[13px]", children: "DC" }),
    /* @__PURE__ */ jsx("span", { className: "font-display text-[18px] tracking-tight", children: "DealChain" })
  ] });
}
const liveSellers = [{
  name: "Priya Singh",
  property: "600 Sq Yard Villa",
  location: "Defence Colony",
  expectation: "₹1.95 Cr",
  status: "Active"
}, {
  name: "Karan Bhatia",
  property: "250 Sq Yard Apartment",
  location: "Saket",
  expectation: "₹26 Lakhs",
  status: "Active"
}, {
  name: "Amit Verma",
  property: "1,200 Sq Yard Plot",
  location: "Anand Niketan",
  expectation: "₹3.2 Cr",
  status: "Active"
}, {
  name: "Neha Kapoor",
  property: "400 Sq Yard Builder Floor",
  location: "Greater Kailash",
  expectation: "₹1.5 Cr",
  status: "Active"
}];
const liveBuyers = [{
  name: "Rohan Mehta",
  looking: "Builder Floor 2400+ sq yards",
  budget: "₹60-75 Cr",
  location: "Greater Kailash",
  status: "Serious"
}, {
  name: "Naina Arora",
  looking: "Apartment 1300-1700 sq yards",
  budget: "₹20-28 Cr",
  location: "Saket",
  status: "Closing in 30 days"
}, {
  name: "Vikram Sethi",
  looking: "Villa 6000+ sq yards",
  budget: "₹1.8+ Cr",
  location: "Vasant Vihar",
  status: "Cash Ready"
}, {
  name: "Sahil Kapoor",
  looking: "Premium Builder Floor",
  budget: "₹1.2 Cr+",
  location: "South Delhi",
  status: "HNI Investor"
}];
function SellerLanding() {
  const {
    user
  } = useAuth();
  const {
    contacts
  } = useStore();
  const [slideSellers, setSlideSellers] = useState(0);
  const [slideBuyers, setSlideBuyers] = useState(0);
  const perView = 2;
  const maxSlideSellers = Math.max(0, liveSellers.length - perView);
  const maxSlideBuyers = Math.max(0, liveBuyers.length - perView);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-9 text-[14px] text-muted-foreground", children: [
        /* @__PURE__ */ jsx("a", { href: "#opportunities", className: "hover:text-foreground transition-colors", children: "Buyer opportunities" }),
        /* @__PURE__ */ jsx("a", { href: "#stats", className: "hover:text-foreground transition-colors", children: "Market activity" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-foreground transition-colors", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "h-9 rounded-full px-5 bg-foreground text-background hover:bg-foreground/90", children: /* @__PURE__ */ jsxs(Link, { to: "/app", children: [
        "Dashboard ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "size-3.5 ml-1" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-[56px] md:text-[96px] leading-[0.96] tracking-[-0.03em]", children: [
          "Post & Sell.",
          /* @__PURE__ */ jsx("br", {}),
          "Get Matched."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-8 text-[17px] md:text-[19px] text-muted-foreground max-w-2xl mx-auto leading-relaxed", children: "Post your property in under 20 seconds. Connect with serious buyers from our network. Get multiple inquiries and close deals faster." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-3 justify-center", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, className: "h-12 px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[15px]", children: /* @__PURE__ */ jsxs(Link, { to: "/inventory", children: [
            "Post Your Property ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "size-4 ml-1" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, className: "h-12 px-7 rounded-full text-[15px]", children: /* @__PURE__ */ jsx(Link, { to: "/app", children: "View Dashboard" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-[24px] font-display", children: "Recent seller listings" }),
            /* @__PURE__ */ jsx("p", { className: "text-[14px] text-muted-foreground mt-1", children: "Properties actively being sold right now" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setSlideSellers((s) => Math.max(0, s - 1)), disabled: slideSellers === 0, className: "size-10 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-secondary transition-colors", "aria-label": "Previous", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" }) }),
            /* @__PURE__ */ jsx("button", { onClick: () => setSlideSellers((s) => Math.min(maxSlideSellers, s + 1)), disabled: slideSellers >= maxSlideSellers, className: "size-10 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-secondary transition-colors", "aria-label": "Next", children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "flex gap-5 transition-transform duration-500 ease-out", style: {
          transform: `translateX(calc(-${slideSellers} * (100% / ${perView} + 20px)))`
        }, children: liveSellers.map((listing, i) => /* @__PURE__ */ jsxs("div", { className: "shrink-0 rounded-2xl border border-border bg-card p-6 hover:border-foreground/30 transition-colors", style: {
          width: `calc((100% - ${(perView - 1) * 20}px) / ${perView})`
        }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground mb-3", children: [
            /* @__PURE__ */ jsx(Home, { className: "size-3.5" }),
            "Selling"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "font-display text-[18px] leading-tight mb-2", children: listing.property }),
          /* @__PURE__ */ jsx("div", { className: "text-[13px] text-muted-foreground mb-1", children: listing.location }),
          /* @__PURE__ */ jsx("div", { className: "text-[13px] font-medium text-foreground mb-3", children: listing.expectation }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/15 text-green-600 text-[11px] font-medium", children: [
            "● ",
            listing.status
          ] })
        ] }, i)) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "opportunities", className: "border-b border-border bg-secondary/40", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-[24px] font-display", children: "Other active sellers" }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-muted-foreground mt-1", children: "See who else is selling" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setSlideSellers((s) => Math.max(0, s - 1)), disabled: slideSellers === 0, className: "size-8 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-background transition-colors", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-3.5" }) }),
            /* @__PURE__ */ jsx("button", { onClick: () => setSlideSellers((s) => Math.min(maxSlideSellers, s + 1)), disabled: slideSellers >= maxSlideSellers, className: "size-8 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-background transition-colors", children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: liveSellers.slice(slideSellers, slideSellers + 2).map((seller, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border p-4 hover:border-foreground/30 transition-colors bg-background", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[13px] font-medium", children: seller.name }),
            /* @__PURE__ */ jsx("div", { className: "px-2 py-1 rounded-full bg-green-500/15 text-green-600 text-[10px] font-semibold", children: "Active" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[12px] text-muted-foreground mb-2", children: [
            seller.property,
            " · ",
            seller.location
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] font-medium text-foreground", children: seller.expectation })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-[24px] font-display", children: "Active buyers looking" }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-muted-foreground mt-1", children: "Match your property with them" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setSlideBuyers((s) => Math.max(0, s - 1)), disabled: slideBuyers === 0, className: "size-8 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-background transition-colors", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-3.5" }) }),
            /* @__PURE__ */ jsx("button", { onClick: () => setSlideBuyers((s) => Math.min(maxSlideBuyers, s + 1)), disabled: slideBuyers >= maxSlideBuyers, className: "size-8 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-background transition-colors", children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: liveBuyers.slice(slideBuyers, slideBuyers + 2).map((buyer, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border p-4 hover:border-foreground/30 transition-colors bg-background", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[13px] font-medium", children: buyer.name }),
            /* @__PURE__ */ jsx("div", { className: "px-2 py-1 rounded-full bg-blue-500/15 text-blue-600 text-[10px] font-semibold", children: buyer.status })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[12px] text-muted-foreground mb-2", children: buyer.looking }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-foreground", children: buyer.budget }),
            /* @__PURE__ */ jsxs("span", { className: "text-[12px] text-muted-foreground", children: [
              "— ",
              buyer.location
            ] })
          ] })
        ] }, i)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "stats", className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[12px] uppercase tracking-[0.18em] text-muted-foreground", children: "How you benefit" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em]", children: "Why sellers choose DealChain" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [{
        icon: "🎯",
        title: "Serious buyers only",
        desc: "Verified buyers with real intent and capital"
      }, {
        icon: "⚡",
        title: "Fast matching",
        desc: "Get buyer inquiries within hours of posting"
      }, {
        icon: "🤝",
        title: "Broker support",
        desc: "Our team helps negotiate and close deals"
      }].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-background p-8 text-center hover:border-foreground/30 transition-colors", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: item.icon }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-[18px] mb-2", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-muted-foreground", children: item.desc })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-display text-[44px] md:text-[64px] leading-[1.02] tracking-[-0.025em]", children: [
        "Post & Sell.",
        /* @__PURE__ */ jsx("br", {}),
        "Get Matched."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-[16px] text-muted-foreground max-w-lg mx-auto", children: "Join 980+ active sellers on DealChain. Post your property and get serious buyer inquiries today." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-3 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "h-12 px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[15px]", children: /* @__PURE__ */ jsxs(Link, { to: "/inventory", children: [
          "Post Your Property ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "size-4 ml-1" })
        ] }) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, className: "h-12 px-7 rounded-full text-[15px]", children: /* @__PURE__ */ jsx(Link, { to: "/app", children: "Go to Dashboard" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 py-8 flex flex-wrap items-center justify-between gap-4 text-[12px] text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Logo, {}),
      /* @__PURE__ */ jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " DealChain · All rights reserved."
      ] })
    ] }) })
  ] });
}
export {
  SellerLanding as component
};
