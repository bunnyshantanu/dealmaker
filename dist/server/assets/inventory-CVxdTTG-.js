import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { A as AppShell, B as Badge } from "./badge-Dm_2tmd4.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import { C as Card } from "./card-BbF6o9Kw.js";
import { B as Button } from "./button-Cz8PAkJh.js";
import { I as Input } from "./input-DVeAuAgX.js";
import { L as Label } from "./label-DOAnQvhy.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BMxB0edH.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Cdo7TSxH.js";
import { S as Slider } from "./slider-yup_WoLs.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-nZ1scBkQ.js";
import { Trash2, RotateCcw, Plus, X, Flame } from "lucide-react";
import { useState } from "react";
import { f as formatINR, a as formatYards } from "./match-XwEOGav4.js";
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
import "@radix-ui/react-tabs";
import "@radix-ui/react-slider";
import "@radix-ui/react-dialog";
const PT = ["Apartment", "Builder Floor", "Villa", "Plot", "Commercial", "Office"];
const DT = ["Resale", "New", "Booking", "Collaboration"];
const urgencyLabel = (kind, filledBy) => {
  if (kind === "requirement") {
    return filledBy === "self" ? "On a scale 1–10, how urgent is your requirement?" : "On a scale 1–10, how serious do you think your buyer is?";
  }
  return filledBy === "self" ? "On a scale 1–10, how urgent is it for you to sell?" : "On a scale 1–10, how fast does your seller want to sell?";
};
function InventoryPage() {
  const {
    listings,
    contacts,
    addListing,
    softDeleteListing,
    restoreListing,
    purgeListing
  } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    ownerId: contacts[0]?.id || "",
    kind: "inventory",
    propertyType: "Apartment",
    dealType: "Resale",
    filledBy: "self",
    filledByBrokerId: "",
    urgency: 5,
    location: "",
    budgetMin: 0,
    budgetMax: 0,
    sizeMin: 0,
    sizeMax: 0,
    collabFloorsOffered: 0,
    collabCashDelta: 0,
    notes: ""
  });
  const submit = () => {
    if (!form.location || !form.ownerId) return;
    addListing({
      ownerId: form.ownerId,
      kind: form.kind,
      propertyType: form.propertyType,
      dealType: form.dealType,
      filledBy: form.filledBy,
      filledByBrokerId: form.filledBy === "broker" ? form.filledByBrokerId || void 0 : void 0,
      urgency: form.urgency,
      location: form.location,
      budgetMin: form.budgetMin,
      budgetMax: form.budgetMax,
      sizeMin: form.sizeMin,
      sizeMax: form.sizeMax,
      notes: form.notes,
      ...form.dealType === "Collaboration" ? {
        collabFloorsOffered: form.collabFloorsOffered,
        collabCashDelta: form.collabCashDelta
      } : {}
    });
    setOpen(false);
    toast.success("Listing added");
  };
  const dealTypeTone = (dt) => dt === "Collaboration" ? "bg-fire/15 text-fire border-fire/30" : dt === "Booking" ? "bg-warning/15 text-foreground border-warning/40" : dt === "New" ? "bg-success/15 text-success border-success/30" : "bg-muted text-foreground";
  const urgencyTone = (u) => !u ? "text-muted-foreground" : u >= 8 ? "text-fire" : u >= 5 ? "text-foreground" : "text-muted-foreground";
  const renderList = (kind) => {
    const items = listings.filter((l) => l.kind === kind && !l.deletedAt);
    return /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      items.map((l) => {
        const owner = contacts.find((c) => c.id === l.ownerId);
        const broker = l.filledByBrokerId ? contacts.find((c) => c.id === l.filledByBrokerId) : null;
        return /* @__PURE__ */ jsxs(Card, { className: "p-5 relative group", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => {
            softDeleteListing(l.id);
            toast("Moved to trash", {
              action: {
                label: "Undo",
                onClick: () => restoreListing(l.id)
              }
            });
          }, className: "absolute top-3 right-3 size-7 grid place-items-center rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all", "aria-label": "Cancel entry", title: "Cancel entry (move to trash)", children: /* @__PURE__ */ jsx(X, { className: "size-4" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between pr-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: l.propertyType }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-display mt-1", children: l.location })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 items-end", children: [
              l.dealType && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: dealTypeTone(l.dealType), children: l.dealType }),
              typeof l.urgency === "number" && /* @__PURE__ */ jsxs("span", { className: "text-[11px] inline-flex items-center gap-1 " + urgencyTone(l.urgency), children: [
                l.urgency >= 8 && /* @__PURE__ */ jsx(Flame, { className: "size-3" }),
                "Urgency ",
                l.urgency,
                "/10"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Budget" }),
              /* @__PURE__ */ jsx("div", { children: l.budgetMin || l.budgetMax ? `${formatINR(l.budgetMin)} – ${formatINR(l.budgetMax)}` : "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Size" }),
              /* @__PURE__ */ jsx("div", { children: formatYards(l.sizeMin, l.sizeMax) })
            ] }),
            l.dealType === "Collaboration" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Floors offered" }),
                /* @__PURE__ */ jsx("div", { children: l.collabFloorsOffered ?? "—" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Cash delta" }),
                /* @__PURE__ */ jsx("div", { children: l.collabCashDelta ? formatINR(l.collabCashDelta) : "—" })
              ] })
            ] })
          ] }),
          l.notes && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-3", children: l.notes }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-border flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Owner" }),
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              owner?.name,
              broker ? ` · via ${broker.name}` : ""
            ] })
          ] })
        ] }, l.id);
      }),
      items.length === 0 && /* @__PURE__ */ jsxs(Card, { className: "p-10 text-center text-sm text-muted-foreground md:col-span-2", children: [
        "No ",
        kind,
        "s yet."
      ] })
    ] });
  };
  const trashed = listings.filter((l) => l.deletedAt);
  return /* @__PURE__ */ jsx(AppShell, { title: "Inventory & Requirements", subtitle: "What sellers have, what buyers want.", action: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "gradient-gold text-primary", children: [
      /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
      " Add listing"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "New listing" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Type" }),
          /* @__PURE__ */ jsxs(Select, { value: form.kind, onValueChange: (v) => setForm({
            ...form,
            kind: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "inventory", children: "Inventory (selling)" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "requirement", children: "Requirement (buying)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Deal type" }),
          /* @__PURE__ */ jsxs(Select, { value: form.dealType, onValueChange: (v) => setForm({
            ...form,
            dealType: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: DT.map((d) => /* @__PURE__ */ jsx(SelectItem, { value: d, children: d }, d)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Filled by" }),
          /* @__PURE__ */ jsxs(Select, { value: form.filledBy, onValueChange: (v) => setForm({
            ...form,
            filledBy: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "self", children: form.kind === "requirement" ? "Buyer (self)" : "Seller (self)" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "broker", children: "Broker (on behalf)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Label, { children: [
            "Owner (",
            form.kind === "requirement" ? "buyer" : "seller",
            ")"
          ] }),
          /* @__PURE__ */ jsxs(Select, { value: form.ownerId, onValueChange: (v) => setForm({
            ...form,
            ownerId: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: contacts.map((c) => /* @__PURE__ */ jsxs(SelectItem, { value: c.id, children: [
              c.name,
              " (",
              c.role,
              ")"
            ] }, c.id)) })
          ] })
        ] }),
        form.filledBy === "broker" && /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Broker filling this form" }),
          /* @__PURE__ */ jsxs(Select, { value: form.filledByBrokerId, onValueChange: (v) => setForm({
            ...form,
            filledByBrokerId: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select broker" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: contacts.filter((c) => c.role === "broker").map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Property type" }),
          /* @__PURE__ */ jsxs(Select, { value: form.propertyType, onValueChange: (v) => setForm({
            ...form,
            propertyType: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: PT.map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, children: p }, p)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Location" }),
          /* @__PURE__ */ jsx(Input, { value: form.location, onChange: (e) => setForm({
            ...form,
            location: e.target.value
          }), placeholder: "Greater Kailash" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Budget min (₹)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.budgetMin || "", onChange: (e) => setForm({
            ...form,
            budgetMin: +e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Budget max (₹)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.budgetMax || "", onChange: (e) => setForm({
            ...form,
            budgetMax: +e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Size min (sq yards)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.sizeMin ? Math.round(form.sizeMin / 9) : "", onChange: (e) => setForm({
            ...form,
            sizeMin: +e.target.value * 9
          }), placeholder: "e.g. 300" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Size max (sq yards)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.sizeMax ? Math.round(form.sizeMax / 9) : "", onChange: (e) => setForm({
            ...form,
            sizeMax: +e.target.value * 9
          }), placeholder: "e.g. 400" })
        ] }),
        form.dealType === "Collaboration" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Floors offered / wanted" }),
            /* @__PURE__ */ jsx(Input, { type: "number", value: form.collabFloorsOffered || "", onChange: (e) => setForm({
              ...form,
              collabFloorsOffered: +e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Cash difference (₹, +/-)" }),
            /* @__PURE__ */ jsx(Input, { type: "number", value: form.collabCashDelta || "", onChange: (e) => setForm({
              ...form,
              collabCashDelta: +e.target.value
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 mt-1", children: [
          /* @__PURE__ */ jsxs(Label, { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: urgencyLabel(form.kind, form.filledBy) }),
            /* @__PURE__ */ jsxs("span", { className: "text-foreground font-semibold", children: [
              form.urgency,
              "/10"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Slider, { value: [form.urgency], min: 1, max: 10, step: 1, onValueChange: (v) => setForm({
            ...form,
            urgency: v[0]
          }), className: "mt-3" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Notes" }),
          /* @__PURE__ */ jsx(Input, { value: form.notes, onChange: (e) => setForm({
            ...form,
            notes: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { onClick: submit, children: "Save" }) })
    ] })
  ] }), children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "inventory", children: [
    /* @__PURE__ */ jsxs(TabsList, { children: [
      /* @__PURE__ */ jsx(TabsTrigger, { value: "inventory", children: "Inventory" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "requirement", children: "Requirements" }),
      /* @__PURE__ */ jsxs(TabsTrigger, { value: "trash", children: [
        /* @__PURE__ */ jsx(Trash2, { className: "size-3.5 mr-1" }),
        " Trash ",
        trashed.length > 0 && `(${trashed.length})`
      ] })
    ] }),
    /* @__PURE__ */ jsx(TabsContent, { value: "inventory", className: "mt-5", children: renderList("inventory") }),
    /* @__PURE__ */ jsx(TabsContent, { value: "requirement", className: "mt-5", children: renderList("requirement") }),
    /* @__PURE__ */ jsx(TabsContent, { value: "trash", className: "mt-5", children: trashed.length === 0 ? /* @__PURE__ */ jsx(Card, { className: "p-10 text-center text-sm text-muted-foreground", children: "Trash is empty." }) : /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: trashed.map((l) => /* @__PURE__ */ jsx(Card, { className: "p-5 opacity-70", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: [
          l.propertyType,
          " · ",
          l.kind
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-display mt-1 line-through", children: l.location }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
          l.dealType,
          " · ",
          formatINR(l.budgetMin),
          "–",
          formatINR(l.budgetMax)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
          restoreListing(l.id);
          toast.success("Restored");
        }, children: [
          /* @__PURE__ */ jsx(RotateCcw, { className: "size-3.5" }),
          " Restore"
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", className: "text-destructive hover:text-destructive", onClick: () => {
          purgeListing(l.id);
          toast("Deleted permanently");
        }, children: [
          /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" }),
          " Delete"
        ] })
      ] })
    ] }) }, l.id)) }) })
  ] }) });
}
export {
  InventoryPage as component
};
