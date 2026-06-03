import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, B as Badge } from "./badge-Dm_2tmd4.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import { b as buildMatches, s as scoreLabel, f as formatINR } from "./match-XwEOGav4.js";
import { C as Card } from "./card-BbF6o9Kw.js";
import { B as Button } from "./button-Cz8PAkJh.js";
import { S as Slider } from "./slider-yup_WoLs.js";
import { L as Label } from "./label-DOAnQvhy.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BMxB0edH.js";
import { Layers, Flame, Handshake, TrendingUp, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import "@tanstack/react-router";
import "./router-CxU_Q1IW.js";
import "zustand";
import "zustand/middleware";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slider";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
const DT = ["All", "Resale", "New", "Booking", "Collaboration"];
function MatchesPage() {
  const {
    listings,
    contacts,
    addDeal
  } = useStore();
  const [minUrgency, setMinUrgency] = useState(1);
  const [dealTypeFilter, setDealTypeFilter] = useState("All");
  const allMatches = buildMatches(listings);
  const matches = allMatches.filter((m) => (m.minUrgency ?? 0) >= minUrgency && (dealTypeFilter === "All" || m.dealType === dealTypeFilter));
  const create = (m) => {
    const buyer = listings.find((l) => l.id === m.buyerListingId);
    const seller = listings.find((l) => l.id === m.sellerListingId);
    const buyerC = contacts.find((c) => c.id === buyer.ownerId);
    const sellerC = contacts.find((c) => c.id === seller.ownerId);
    const isCollab = m.outcomes.includes("Collaboration");
    const isTrading = m.outcomes.includes("Trading");
    addDeal({
      title: `${buyer.location} ${buyer.propertyType} — ${buyerC.name} × ${sellerC.name}`,
      buyerId: buyerC.id,
      sellerId: sellerC.id,
      brokerIds: [],
      type: isCollab ? "Collaboration" : isTrading ? "Trading" : "Brokerage",
      subtype: isCollab ? "collab" : isTrading ? "direct" : "1-table",
      stage: "Discussion",
      value: Math.round((seller.budgetMin + seller.budgetMax) / 2) || 0,
      matchId: m.id
    });
    toast.success("Deal added to pipeline");
  };
  return /* @__PURE__ */ jsxs(AppShell, { title: "Matches", subtitle: `${matches.length} of ${allMatches.length} match the filter.`, children: [
    /* @__PURE__ */ jsxs(Card, { className: "p-4 mb-5 flex flex-wrap items-center gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-64", children: [
        /* @__PURE__ */ jsxs(Label, { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Min urgency" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            minUrgency,
            "/10"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Slider, { value: [minUrgency], min: 1, max: 10, step: 1, onValueChange: (v) => setMinUrgency(v[0]) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-48", children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2 block", children: "Deal type" }),
        /* @__PURE__ */ jsxs(Select, { value: dealTypeFilter, onValueChange: (v) => setDealTypeFilter(v), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: DT.map((d) => /* @__PURE__ */ jsx(SelectItem, { value: d, children: d }, d)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      matches.map((m) => {
        const buyer = listings.find((l) => l.id === m.buyerListingId);
        const seller = listings.find((l) => l.id === m.sellerListingId);
        const buyerC = contacts.find((c) => c.id === buyer.ownerId);
        const sellerC = contacts.find((c) => c.id === seller.ownerId);
        const lab = scoreLabel(m.score);
        const isCollab = m.outcomes.includes("Collaboration");
        const accent = isCollab ? "bg-fire/15 text-fire" : lab.tone === "fire" ? "bg-fire text-primary-foreground" : lab.tone === "success" ? "bg-success text-success-foreground" : lab.tone === "gold" ? "gradient-gold text-primary-foreground" : "bg-muted text-foreground";
        return /* @__PURE__ */ jsx(Card, { className: "p-5 md:p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 size-20 rounded-2xl grid place-items-center font-display " + accent, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl leading-none", children: m.score }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wider opacity-80 mt-0.5", children: "Match" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-64", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1.5 flex-wrap", children: [
              /* @__PURE__ */ jsx(Badge, { className: accent + " border-0", children: isCollab ? "Collaboration match" : lab.label }),
              m.dealType && /* @__PURE__ */ jsx(Badge, { variant: "outline", children: m.dealType }),
              m.outcomes.includes("Collaboration") && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "border-fire/40 text-fire", children: [
                /* @__PURE__ */ jsx(Layers, { className: "size-3 mr-1" }),
                " Collab"
              ] }),
              m.score >= 80 && !isCollab && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "border-fire/40 text-fire", children: [
                /* @__PURE__ */ jsx(Flame, { className: "size-3 mr-1" }),
                " Trading possibility"
              ] }),
              m.outcomes.includes("Brokerage") && /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
                /* @__PURE__ */ jsx(Handshake, { className: "size-3 mr-1" }),
                " Brokerage"
              ] }),
              (m.minUrgency ?? 0) >= 8 && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "border-fire/40 text-fire", children: [
                /* @__PURE__ */ jsx(Flame, { className: "size-3 mr-1" }),
                " Urgent ",
                m.minUrgency,
                "/10"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-lg font-display", children: [
              buyer.propertyType,
              " · ",
              buyer.location
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mt-3 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Buyer side" }),
                /* @__PURE__ */ jsx("div", { className: "font-medium mt-0.5", children: buyerC?.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-xs", children: [
                  formatINR(buyer.budgetMin),
                  "–",
                  formatINR(buyer.budgetMax),
                  " · ",
                  buyer.sizeMin,
                  "–",
                  buyer.sizeMax,
                  " sqft · urgency ",
                  buyer.urgency ?? "—",
                  "/10"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Seller side" }),
                /* @__PURE__ */ jsx("div", { className: "font-medium mt-0.5", children: sellerC?.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-xs", children: [
                  formatINR(seller.budgetMin),
                  "–",
                  formatINR(seller.budgetMax),
                  " · ",
                  seller.sizeMin,
                  "–",
                  seller.sizeMax,
                  " sqft · urgency ",
                  seller.urgency ?? "—",
                  "/10"
                ] })
              ] })
            ] }),
            m.spread !== void 0 && m.spread > 0 && !isCollab && /* @__PURE__ */ jsxs("div", { className: "mt-3 inline-flex items-center gap-1.5 text-xs text-success", children: [
              /* @__PURE__ */ jsx(TrendingUp, { className: "size-3.5" }),
              "Hidden spread: ",
              formatINR(m.spread)
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 self-stretch justify-center", children: /* @__PURE__ */ jsxs(Button, { onClick: () => create(m), className: "gradient-gold text-primary-foreground", children: [
            "Add to pipeline ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })
          ] }) })
        ] }) }, m.id);
      }),
      matches.length === 0 && /* @__PURE__ */ jsx(Card, { className: "p-10 text-center text-sm text-muted-foreground", children: "No matches at this filter — lower the urgency or widen deal type." })
    ] })
  ] });
}
export {
  MatchesPage as component
};
