import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, B as Badge } from "./badge-Dm_2tmd4.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import { b as buildMatches, f as formatINR, a as formatYards } from "./match-XwEOGav4.js";
import { C as Card } from "./card-BbF6o9Kw.js";
import { B as Button } from "./button-Cz8PAkJh.js";
import { ArrowUpRight, Sparkles, Bell, Plus, TrendingUp, Target, Users, Flame } from "lucide-react";
import { u as useAuth } from "./router-CxU_Q1IW.js";
import "class-variance-authority";
import "zustand";
import "zustand/middleware";
import "react";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "sonner";
function Dashboard() {
  const {
    user
  } = useAuth();
  const {
    contacts,
    listings,
    deals
  } = useStore();
  const matches = buildMatches(listings);
  if (user?.role === "client") {
    const topMatches2 = matches.slice(0, 4);
    const myDeals = deals.filter((d) => d.stage !== "Dropped" && d.stage !== "Closed").slice(0, 4);
    return /* @__PURE__ */ jsxs(AppShell, { title: `Welcome, ${user.name.split(" ")[0]}.`, subtitle: "Your matches, your deals, your opportunities — all in one place.", action: /* @__PURE__ */ jsx(Button, { asChild: true, className: "rounded-full bg-foreground text-background hover:bg-foreground/90", children: /* @__PURE__ */ jsxs(Link, { to: "/inventory", children: [
      /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
      " Post requirement or inventory"
    ] }) }), children: [
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-5", children: [
        /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 p-6 rounded-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-display", children: "My matches" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Relevant opportunities found for you" })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/matches", className: "text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1", children: [
              "See all ",
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-3" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            topMatches2.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "size-8 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No matches yet — post a requirement or inventory to get started." })
            ] }),
            topMatches2.map((m) => {
              const buyer = listings.find((l) => l.id === m.buyerListingId);
              const seller = listings.find((l) => l.id === m.sellerListingId);
              const buyerC = contacts.find((c) => c.id === buyer.ownerId);
              const sellerC = contacts.find((c) => c.id === seller.ownerId);
              const trading = m.score >= 80 && m.outcomes.includes("Trading");
              return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border p-4 hover:border-foreground/30 transition-colors", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: [
                    buyer.propertyType,
                    " · ",
                    buyer.location
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    trading && /* @__PURE__ */ jsx(Badge, { className: "bg-fire/15 text-fire border-0 text-[10px]", children: "Trading possibility" }),
                    /* @__PURE__ */ jsxs("div", { className: "px-2.5 py-0.5 rounded-full bg-foreground text-background text-[11px] font-semibold", children: [
                      m.score,
                      "%"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-[14px] leading-snug", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: buyerC?.name }),
                  " requires",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatINR(buyer.budgetMax || buyer.budgetMin) }),
                  " property ·",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: sellerC?.name }),
                  " offering",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatINR(seller.budgetMin || seller.budgetMax) }),
                  " property"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-2 text-[12px] text-muted-foreground", children: formatYards(seller.sizeMin, seller.sizeMax) })
              ] }, m.id);
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs(Card, { className: "p-5 rounded-2xl", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsx(Bell, { className: "size-4" }),
              /* @__PURE__ */ jsx("h2", { className: "text-base font-display", children: "Notifications" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-[13px]", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-secondary/60 p-3", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium", children: "2 new matches in Greater Kailash" }),
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-[11px] mt-0.5", children: "Just now" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-secondary/60 p-3", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Team will reach out about your Vasant Vihar requirement" }),
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-[11px] mt-0.5", children: "2 hours ago" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "p-5 rounded-2xl", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-base font-display", children: "My active deals" }),
              /* @__PURE__ */ jsx(Link, { to: "/pipeline", className: "text-[11px] text-muted-foreground hover:text-foreground", children: "View all" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
              myDeals.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "No active deals yet." }),
              myDeals.map((d) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-3", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[13px] font-medium leading-tight", children: d.title }),
                /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-muted-foreground mt-1 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Stage: ",
                    d.stage
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: formatINR(d.value) })
                ] })
              ] }, d.id))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "mt-6 p-6 rounded-2xl bg-secondary/40 border-dashed", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "size-10 rounded-full bg-foreground text-background grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-4" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-[18px]", children: "What happens next?" }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-muted-foreground mt-1 leading-relaxed max-w-2xl", children: "Your information is part of the DealChain network. Matching runs continuously as new requirements and inventory are added. You'll get notified for every relevant opportunity, and our team will reach out when a high-fit deal is identified." })
        ] })
      ] }) })
    ] });
  }
  const topMatches = matches.slice(0, 4);
  const newUsers = contacts.filter((c) => Date.now() - new Date(c.createdAt).getTime() < 7 * 864e5);
  const closedValue = deals.filter((d) => d.stage === "Closed").reduce((s, d) => s + d.value, 0);
  const pipelineValue = deals.filter((d) => d.stage !== "Dropped" && d.stage !== "Closed").reduce((s, d) => s + d.value, 0);
  return /* @__PURE__ */ jsxs(AppShell, { title: "Today's deal floor", subtitle: "Your network at a glance — matches, momentum, and money on the table.", action: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/broadcast", children: "Send broadcast" }) }),
    /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-foreground text-background hover:bg-foreground/90", children: /* @__PURE__ */ jsx(Link, { to: "/matches", children: "View matches" }) })
  ] }), children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(Stat, { icon: Sparkles, label: "Live matches", value: String(matches.length), hint: `${matches.filter((m) => m.score >= 80).length} ≥ 80%` }),
      /* @__PURE__ */ jsx(Stat, { icon: TrendingUp, label: "Pipeline value", value: formatINR(pipelineValue), hint: `${deals.filter((d) => d.stage !== "Closed" && d.stage !== "Dropped").length} active deals` }),
      /* @__PURE__ */ jsx(Stat, { icon: Target, label: "Closed YTD", value: formatINR(closedValue) }),
      /* @__PURE__ */ jsx(Stat, { icon: Users, label: "Network", value: String(contacts.length), hint: `${newUsers.length} joined this week` })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "mt-6 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-display", children: "Top matches" }),
        /* @__PURE__ */ jsxs(Link, { to: "/matches", className: "text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1", children: [
          "See all ",
          /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        topMatches.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No matches yet." }),
        topMatches.map((m) => {
          const buyer = listings.find((l) => l.id === m.buyerListingId);
          const seller = listings.find((l) => l.id === m.sellerListingId);
          const buyerC = contacts.find((c) => c.id === buyer.ownerId);
          const sellerC = contacts.find((c) => c.id === seller.ownerId);
          const trading = m.score >= 80;
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 p-4 rounded-lg border border-border hover:border-foreground/30 transition-colors", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium truncate", children: [
                buyer.propertyType,
                " · ",
                buyer.location,
                " · ",
                formatYards(seller.sizeMin, seller.sizeMax)
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground truncate mt-0.5", children: [
                buyerC?.name,
                " (",
                formatINR(buyer.budgetMax),
                ") × ",
                sellerC?.name,
                " (",
                formatINR(seller.budgetMin),
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              trading && /* @__PURE__ */ jsxs(Badge, { className: "bg-fire/15 text-fire border-0 text-[10px]", children: [
                /* @__PURE__ */ jsx(Flame, { className: "size-3 mr-1" }),
                " Trading"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "px-3 py-1 rounded-full text-xs font-semibold bg-foreground text-background", children: [
                m.score,
                "%"
              ] })
            ] })
          ] }, m.id);
        })
      ] })
    ] })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value,
  hint
}) {
  return /* @__PURE__ */ jsx(Card, { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsx("div", { className: "text-3xl font-display mt-2", children: value }),
      hint && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: hint })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "size-10 rounded-lg bg-secondary grid place-items-center", children: /* @__PURE__ */ jsx(Icon, { className: "size-5" }) })
  ] }) });
}
export {
  Dashboard as component
};
