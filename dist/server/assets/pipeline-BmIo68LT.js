import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { A as AppShell, B as Badge } from "./badge-Dm_2tmd4.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import { C as Card } from "./card-BbF6o9Kw.js";
import { B as Button } from "./button-Cz8PAkJh.js";
import { f as formatINR } from "./match-XwEOGav4.js";
import { Check, Phone, X } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "./router-CxU_Q1IW.js";
import "zustand";
import "zustand/middleware";
import "class-variance-authority";
import "react";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
const stages = ["Discussion", "Site Visit", "Negotiation", "Token", "Registry", "Closed", "Dropped"];
function PipelinePage() {
  const {
    deals,
    contacts,
    updateDealStage,
    bumpReliability,
    logActivity
  } = useStore();
  const total = deals.filter((d) => d.stage !== "Dropped" && d.stage !== "Closed").reduce((s, d) => s + d.value, 0);
  return /* @__PURE__ */ jsx(AppShell, { title: "Deal pipeline", subtitle: `${formatINR(total)} active across ${deals.length} deals`, children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-min", children: stages.map((stage) => {
    const items = deals.filter((d) => d.stage === stage);
    const stageColor = stage === "Closed" ? "bg-success/15 text-success" : stage === "Dropped" ? "bg-destructive/15 text-destructive" : stage === "Registry" ? "bg-success/10 text-success" : stage === "Token" ? "gradient-gold text-primary" : stage === "Negotiation" ? "bg-fire/15 text-fire" : "bg-muted text-foreground";
    return /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 rounded-md text-xs font-semibold " + stageColor, children: stage }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: items.length })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatINR(items.reduce((s, d) => s + d.value, 0)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        items.map((d) => {
          const buyer = contacts.find((c) => c.id === d.buyerId);
          const seller = contacts.find((c) => c.id === d.sellerId);
          return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-3 bg-background", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium leading-tight", children: d.title }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
              d.type,
              " · ",
              d.subtype,
              " · ",
              formatINR(d.value)
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-1", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-[10px]", children: buyer?.name }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-[10px]", children: seller?.name })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 flex gap-1.5 flex-wrap", children: stage !== "Closed" && stage !== "Dropped" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", className: "h-7 text-xs", onClick: () => {
                const next = stages[Math.min(stages.indexOf(stage) + 1, 5)];
                updateDealStage(d.id, next);
                if (next === "Site Visit") {
                  bumpReliability(d.buyerId, 2);
                  logActivity(d.buyerId, "Site visit scheduled");
                }
                if (next === "Closed") {
                  bumpReliability(d.sellerId, 5);
                  bumpReliability(d.buyerId, 5);
                }
                toast.success(`Moved to ${next}`);
              }, children: [
                /* @__PURE__ */ jsx(Check, { className: "size-3" }),
                " Advance"
              ] }),
              /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", className: "h-7 text-xs", onClick: () => {
                logActivity(d.buyerId, "Called buyer");
                toast("Activity logged");
              }, children: [
                /* @__PURE__ */ jsx(Phone, { className: "size-3" }),
                " Log call"
              ] }),
              /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", className: "h-7 text-xs text-destructive hover:text-destructive", onClick: () => {
                updateDealStage(d.id, "Dropped");
                toast("Deal dropped");
              }, children: [
                /* @__PURE__ */ jsx(X, { className: "size-3" }),
                " Drop"
              ] })
            ] }) })
          ] }, d.id);
        }),
        items.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground py-4 text-center", children: "Empty" })
      ] })
    ] }, stage);
  }) }) });
}
export {
  PipelinePage as component
};
