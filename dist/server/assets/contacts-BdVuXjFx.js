import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, B as Badge } from "./badge-Dm_2tmd4.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import { C as Card } from "./card-BbF6o9Kw.js";
import { I as Input } from "./input-DVeAuAgX.js";
import { B as Button } from "./button-Cz8PAkJh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BMxB0edH.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-nZ1scBkQ.js";
import { L as Label } from "./label-DOAnQvhy.js";
import { useState } from "react";
import { Search, Ban, Star, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import "@tanstack/react-router";
import "./router-CxU_Q1IW.js";
import "zustand";
import "zustand/middleware";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-select";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
function ContactsPage() {
  const {
    contacts,
    addContact,
    toggleBlacklist,
    rateContact
  } = useStore();
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [showBlacklisted, setShowBlacklisted] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: "buyer"
  });
  const filtered = contacts.filter((c) => (role === "all" || c.role === role) && (showBlacklisted ? c.blacklisted : !c.blacklisted) && (c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q)));
  const submit = () => {
    if (!form.name || !form.phone) return;
    addContact({
      ...form,
      source: "Internal",
      reliability: 60,
      tags: [],
      verified: true
    });
    setForm({
      name: "",
      phone: "",
      email: "",
      role: "buyer"
    });
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs(AppShell, { title: "Contacts", subtitle: "Brokers, buyers, sellers — all in one place. Rate, review, or blacklist as needed.", action: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "gradient-gold text-primary", children: [
      /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
      " Add contact"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "New contact" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsx(Input, { value: form.name, onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Phone" }),
          /* @__PURE__ */ jsx(Input, { value: form.phone, onChange: (e) => setForm({
            ...form,
            phone: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Email (optional)" }),
          /* @__PURE__ */ jsx(Input, { value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Role" }),
          /* @__PURE__ */ jsxs(Select, { value: form.role, onValueChange: (v) => setForm({
            ...form,
            role: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "broker", children: "Broker" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "buyer", children: "Buyer" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "seller", children: "Seller" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { onClick: submit, children: "Save" }) })
    ] })
  ] }), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mb-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-64", children: [
        /* @__PURE__ */ jsx(Search, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by name or phone", className: "pl-9" })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: role, onValueChange: (v) => setRole(v), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All roles" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "broker", children: "Brokers" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "buyer", children: "Buyers" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "seller", children: "Sellers" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: showBlacklisted ? "default" : "outline", onClick: () => setShowBlacklisted((v) => !v), className: showBlacklisted ? "" : "text-destructive border-destructive/40 hover:bg-destructive/5", children: [
        /* @__PURE__ */ jsx(Ban, { className: "size-4" }),
        " ",
        showBlacklisted ? "Hide blacklisted" : "Show blacklisted"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 px-5 py-3 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: "Name" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1", children: "Role" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "Reliability" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "Rating" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "Last active" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right pr-2", children: "Actions" })
      ] }),
      filtered.map((c) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 px-5 py-4 items-center border-b border-border last:border-0 hover:bg-muted/30 transition-colors " + (c.blacklisted ? "opacity-60" : ""), children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-3 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-medium truncate flex items-center gap-2", children: [
            c.name,
            c.blacklisted && /* @__PURE__ */ jsx(Badge, { variant: "destructive", className: "text-[9px]", children: "Blacklisted" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: c.phone })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1 capitalize text-sm", children: c.role }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-1.5 w-20 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full " + (c.reliability >= 80 ? "bg-success" : c.reliability >= 60 ? "bg-gold" : "bg-fire"), style: {
            width: `${c.reliability}%`
          } }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: c.reliability })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsx("button", { onClick: () => {
            rateContact(c.id, n);
            toast.success(`Rated ${c.name.split(" ")[0]} ${n}/5`);
          }, "aria-label": `Rate ${n} stars`, children: /* @__PURE__ */ jsx(Star, { className: "size-3.5 " + (n <= Math.round(c.rating ?? 0) ? "fill-gold text-gold" : "text-muted-foreground hover:text-foreground") }) }, n)),
          c.reviewsCount ? /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-muted-foreground ml-1", children: [
            "(",
            c.reviewsCount,
            ")"
          ] }) : null
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 text-xs text-muted-foreground", children: [
          formatDistanceToNow(new Date(c.lastActive)),
          " ago"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 flex justify-end", children: /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", onClick: () => {
          toggleBlacklist(c.id, c.blacklisted ? void 0 : "Manual blacklist");
          toast(c.blacklisted ? `${c.name.split(" ")[0]} restored` : `${c.name.split(" ")[0]} blacklisted`);
        }, className: c.blacklisted ? "text-success hover:text-success" : "text-destructive hover:text-destructive", children: [
          /* @__PURE__ */ jsx(Ban, { className: "size-3.5" }),
          " ",
          c.blacklisted ? "Unblacklist" : "Blacklist"
        ] }) })
      ] }, c.id)),
      filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "p-10 text-center text-sm text-muted-foreground", children: "No contacts match." })
    ] })
  ] });
}
export {
  ContactsPage as component
};
