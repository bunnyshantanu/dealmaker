import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, B as Badge } from "./badge-Dm_2tmd4.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import { C as Card } from "./card-BbF6o9Kw.js";
import { B as Button } from "./button-Cz8PAkJh.js";
import { Sparkles, Phone } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import "@tanstack/react-router";
import "./router-CxU_Q1IW.js";
import "sonner";
import "zustand";
import "zustand/middleware";
import "class-variance-authority";
import "react";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
function NewUsersPage() {
  const {
    contacts
  } = useStore();
  const newUsers = contacts.filter((c) => Date.now() - new Date(c.createdAt).getTime() < 14 * 864e5).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  return /* @__PURE__ */ jsxs(AppShell, { title: "New users joined", subtitle: "Free leads — your network is growing.", children: [
    newUsers.length === 0 && /* @__PURE__ */ jsx(Card, { className: "p-10 text-center text-sm text-muted-foreground", children: "No new users in the last 14 days." }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: newUsers.map((c) => {
      const ref = contacts.find((x) => x.id === c.referredBy);
      return /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
          /* @__PURE__ */ jsxs(Badge, { className: "bg-gold/20 text-foreground border-0", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "size-3 mr-1" }),
            " ",
            c.source
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
            formatDistanceToNow(new Date(c.createdAt)),
            " ago"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-display", children: c.name }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground capitalize", children: c.role }),
        /* @__PURE__ */ jsx("div", { className: "text-sm mt-3", children: c.phone }),
        ref && /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
          "Referred by ",
          /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: ref.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-4", children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: `tel:${c.phone.replace(/\s+/g, "")}`, children: [
            /* @__PURE__ */ jsx(Phone, { className: "size-3.5" }),
            " Call"
          ] }) }),
          !c.verified && /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Unverified" })
        ] })
      ] }, c.id);
    }) })
  ] });
}
export {
  NewUsersPage as component
};
