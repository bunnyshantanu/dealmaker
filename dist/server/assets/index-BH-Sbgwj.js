import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { B as Button } from "./button-Cz8PAkJh.js";
import { ArrowRight, ChevronLeft, ChevronRight, Flame, Users } from "lucide-react";
import { useState } from "react";
import { u as useAuth } from "./router-CxU_Q1IW.js";
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
const hotCards = [{
  kind: "Hot Property",
  title: "400 Sq Yard Builder Floor",
  area: "Saket",
  tag: "Below market"
}, {
  kind: "Hot Buyer",
  title: "Immediate buyer seeking premium property",
  area: "Vasant Vihar",
  tag: "Closing in 30 days"
}, {
  kind: "Hot Property",
  title: "250 Sq Yard Apartment",
  area: "Greater Kailash",
  tag: "Off-market"
}, {
  kind: "Hot Buyer",
  title: "HNI investor — 5+ floors wanted",
  area: "South Delhi",
  tag: "Cash ready"
}, {
  kind: "Hot Property",
  title: "600 Sq Yard Villa",
  area: "Defence Colony",
  tag: "Quick close"
}, {
  kind: "Hot Buyer",
  title: "Builder seeking collaboration",
  area: "Panchsheel Park",
  tag: "Trading possible"
}, {
  kind: "Hot Property",
  title: "1,000 Sq Yard Plot",
  area: "Anand Niketan",
  tag: "Resale"
}];
function Landing() {
  const {
    user
  } = useAuth();
  const [slide, setSlide] = useState(0);
  const perView = 3;
  const maxSlide = Math.max(0, hotCards.length - perView);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-9 text-[14px] text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Link, { to: "/hello", className: "hover:text-foreground transition-colors", children: "Hello" }),
        /* @__PURE__ */ jsx("a", { href: "#how", className: "hover:text-foreground transition-colors", children: "How it works" }),
        /* @__PURE__ */ jsx("a", { href: "#hot", className: "hover:text-foreground transition-colors", children: "Live opportunities" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-foreground transition-colors", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "h-9 rounded-full px-5 bg-foreground text-background hover:bg-foreground/90", children: user ? /* @__PURE__ */ jsxs(Link, { to: "/app", children: [
        "Dashboard ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "size-3.5 ml-1" })
      ] }) : /* @__PURE__ */ jsxs(Link, { to: "/login", children: [
        "Sign in ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "size-3.5 ml-1" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-20 text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-display text-[56px] md:text-[96px] leading-[0.96] tracking-[-0.03em]", children: [
        "Stop chasing.",
        /* @__PURE__ */ jsx("br", {}),
        "Start closing."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-[17px] md:text-[19px] text-muted-foreground max-w-2xl mx-auto leading-relaxed", children: "Post your requirement or inventory in under 20 seconds. Our system continuously identifies relevant opportunities, re-matches them as the network grows, and helps move deals toward closure." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-3 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "h-12 px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[15px]", children: /* @__PURE__ */ jsxs(Link, { to: "/login", children: [
          "Open Deal Floor ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "size-4 ml-1" })
        ] }) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, className: "h-12 px-7 rounded-full text-[15px]", children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Register" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border bg-secondary/40", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-10", children: /* @__PURE__ */ jsx("div", { className: "text-[12px] uppercase tracking-[0.18em] text-muted-foreground", children: "Live across the network" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [{
        k: "1,240+",
        v: "Active buyers"
      }, {
        k: "980+",
        v: "Active sellers"
      }, {
        k: "5,400+",
        v: "Active brokers"
      }, {
        k: "3,200+",
        v: "Active properties"
      }, {
        k: "184",
        v: "Deals in progress"
      }].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-background p-5 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-[26px] md:text-[30px] tracking-tight", children: s.k }),
        /* @__PURE__ */ jsx("div", { className: "text-[12px] text-muted-foreground mt-1", children: s.v })
      ] }, s.v)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "hot", className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-[12px] uppercase tracking-[0.18em] text-muted-foreground", children: "Hot opportunities" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em]", children: "A glimpse of what's moving today." }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-[14px] text-muted-foreground max-w-md", children: "Details are kept private. Sign in to see full matches in your zone." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setSlide((s) => Math.max(0, s - 1)), disabled: slide === 0, className: "size-10 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-secondary transition-colors", "aria-label": "Previous", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => setSlide((s) => Math.min(maxSlide, s + 1)), disabled: slide >= maxSlide, className: "size-10 rounded-full border border-border grid place-items-center disabled:opacity-30 hover:bg-secondary transition-colors", "aria-label": "Next", children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "flex gap-5 transition-transform duration-500 ease-out", style: {
        transform: `translateX(calc(-${slide} * (100% / ${perView} + 0px)))`
      }, children: hotCards.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "shrink-0 rounded-2xl border border-border bg-card p-6 hover:border-foreground/30 transition-colors", style: {
        width: `calc((100% - ${(perView - 1) * 20}px) / ${perView})`
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground", children: [
          c.kind === "Hot Property" ? /* @__PURE__ */ jsx(Flame, { className: "size-3.5" }) : /* @__PURE__ */ jsx(Users, { className: "size-3.5" }),
          c.kind
        ] }),
        /* @__PURE__ */ jsx("div", { className: "font-display text-[20px] mt-4 leading-tight", children: c.title }),
        /* @__PURE__ */ jsx("div", { className: "text-[14px] text-muted-foreground mt-1.5", children: c.area }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 inline-flex items-center px-2.5 py-1 rounded-full bg-secondary text-[11px]", children: c.tag })
      ] }, i)) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "how", className: "border-b border-border bg-secondary/40", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[12px] uppercase tracking-[0.18em] text-muted-foreground", children: "How it works" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em]", children: "Five steps. One closure." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-3", children: [{
        n: "01",
        t: "Register"
      }, {
        n: "02",
        t: "Post requirement or inventory"
      }, {
        n: "03",
        t: "Get matches"
      }, {
        n: "04",
        t: "Connect"
      }, {
        n: "05",
        t: "Close deals"
      }].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-background p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[11px] tabular-nums text-muted-foreground", children: s.n }),
        /* @__PURE__ */ jsx("div", { className: "font-display text-[18px] mt-3 leading-tight", children: s.t })
      ] }, s.n)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-display text-[44px] md:text-[64px] leading-[1.02] tracking-[-0.025em]", children: [
        "Stop chasing.",
        /* @__PURE__ */ jsx("br", {}),
        "Start closing."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-[16px] text-muted-foreground max-w-lg mx-auto", children: "Spend 20 seconds posting a listing — the network does the rest." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-3 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "h-12 px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[15px]", children: /* @__PURE__ */ jsxs(Link, { to: "/login", children: [
          "Open Deal Floor ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "size-4 ml-1" })
        ] }) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, className: "h-12 px-7 rounded-full text-[15px]", children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Register" }) })
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
  Landing as component
};
