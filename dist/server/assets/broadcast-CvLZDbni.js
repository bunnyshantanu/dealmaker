import { jsx, jsxs } from "react/jsx-runtime";
import { A as AppShell, B as Badge } from "./badge-Dm_2tmd4.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import { C as Card } from "./card-BbF6o9Kw.js";
import { B as Button } from "./button-Cz8PAkJh.js";
import { T as Textarea } from "./textarea-CIfPmIKy.js";
import { I as Input } from "./input-DVeAuAgX.js";
import { L as Label } from "./label-DOAnQvhy.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BMxB0edH.js";
import { S as Slider } from "./slider-yup_WoLs.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Cdo7TSxH.js";
import { SlidersHorizontal, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "./router-CxU_Q1IW.js";
import "zustand";
import "zustand/middleware";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@radix-ui/react-slider";
import "@radix-ui/react-tabs";
function BroadcastPage() {
  const {
    contacts,
    logActivity
  } = useStore();
  const [msg, setMsg] = useState("Good morning team — sharing 3 new GK requirements today. Reply if you have inventory.");
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "Any",
    budgetMin: 0,
    budgetMax: 0,
    sizeMin: 0,
    sizeMax: 0,
    minUrgency: 1,
    requirementType: "Any"
  });
  const inactive = contacts.filter((c) => Date.now() - new Date(c.lastActive).getTime() > 7 * 864e5);
  const top = [...contacts].filter((c) => c.role === "broker").sort((a, b) => b.reliability - a.reliability).slice(0, 5);
  const send = (group, label) => {
    group.forEach((c) => logActivity(c.id, `Broadcast: ${label}`));
    toast.success(`Sent to ${group.length} ${label}`);
  };
  return /* @__PURE__ */ jsx(AppShell, { title: "Broadcast", subtitle: "Daily ping, inactive nudges, top-broker outreach.", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-xl mb-4", children: "Compose message" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 6, value: msg, onChange: (e) => setMsg(e.target.value) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 text-xs text-muted-foreground", children: "Mock-only: messages are logged to each contact's activity." })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(SlidersHorizontal, { className: "size-4" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-lg", children: "Advanced filters" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Location" }),
            /* @__PURE__ */ jsx(Input, { value: filters.location, onChange: (e) => setFilters({
              ...filters,
              location: e.target.value
            }), placeholder: "e.g. Greater Kailash" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Property type" }),
            /* @__PURE__ */ jsxs(Select, { value: filters.propertyType, onValueChange: (v) => setFilters({
              ...filters,
              propertyType: v
            }), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: ["Any", "Apartment", "Builder Floor", "Villa", "Plot", "Commercial", "Office"].map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, children: p }, p)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Budget min (₹)" }),
            /* @__PURE__ */ jsx(Input, { type: "number", value: filters.budgetMin || "", onChange: (e) => setFilters({
              ...filters,
              budgetMin: +e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Budget max (₹)" }),
            /* @__PURE__ */ jsx(Input, { type: "number", value: filters.budgetMax || "", onChange: (e) => setFilters({
              ...filters,
              budgetMax: +e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Size min (sq yards)" }),
            /* @__PURE__ */ jsx(Input, { type: "number", value: filters.sizeMin || "", onChange: (e) => setFilters({
              ...filters,
              sizeMin: +e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Size max (sq yards)" }),
            /* @__PURE__ */ jsx(Input, { type: "number", value: filters.sizeMax || "", onChange: (e) => setFilters({
              ...filters,
              sizeMax: +e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Requirement type" }),
            /* @__PURE__ */ jsxs(Select, { value: filters.requirementType, onValueChange: (v) => setFilters({
              ...filters,
              requirementType: v
            }), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: ["Any", "Resale", "New", "Booking", "Collaboration"].map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, children: p }, p)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Label, { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Min urgency" }),
              /* @__PURE__ */ jsxs("span", { className: "text-foreground font-semibold", children: [
                filters.minUrgency,
                "/10"
              ] })
            ] }),
            /* @__PURE__ */ jsx(Slider, { value: [filters.minUrgency], min: 1, max: 10, step: 1, onValueChange: (v) => setFilters({
              ...filters,
              minUrgency: v[0]
            }), className: "mt-3" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsx(Card, { className: "p-5", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "all", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "w-full", children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "all", className: "flex-1", children: [
          "All (",
          contacts.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "inactive", className: "flex-1", children: [
          "Inactive (",
          inactive.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "top", className: "flex-1", children: [
          "Top (",
          top.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "all", className: "mt-4", children: /* @__PURE__ */ jsxs(Button, { className: "w-full bg-foreground text-background hover:bg-foreground/90", onClick: () => send(contacts, "all contacts"), children: [
        /* @__PURE__ */ jsx(Send, { className: "size-4" }),
        " Send daily broadcast"
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "inactive", className: "mt-4", children: /* @__PURE__ */ jsxs(Button, { className: "w-full", variant: "outline", onClick: () => send(inactive, "inactive users"), children: [
        /* @__PURE__ */ jsx(Send, { className: "size-4" }),
        " Bulk ping inactive"
      ] }) }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "top", className: "mt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-3", children: top.map((c) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "mr-1", children: c.name }, c.id)) }),
        /* @__PURE__ */ jsxs(Button, { className: "w-full", variant: "outline", onClick: () => send(top, "top brokers"), children: [
          /* @__PURE__ */ jsx(Send, { className: "size-4" }),
          " Personal outreach"
        ] })
      ] })
    ] }) }) })
  ] }) });
}
export {
  BroadcastPage as component
};
