import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation, useNavigate, Link } from "@tanstack/react-router";
import { Link2, LayoutDashboard, Users, Building2, Sparkles, ListChecks, UserPlus, Megaphone, FileSpreadsheet, LogOut, Menu } from "lucide-react";
import { c as cn } from "./button-Cz8PAkJh.js";
import { u as useAuth } from "./router-CxU_Q1IW.js";
import { cva } from "class-variance-authority";
const brokerItems = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/contacts", label: "Contacts", icon: Users },
  { to: "/inventory", label: "Inventory", icon: Building2 },
  { to: "/matches", label: "Matches", icon: Sparkles },
  { to: "/pipeline", label: "Pipeline", icon: ListChecks },
  { to: "/new-users", label: "New Users", icon: UserPlus },
  { to: "/broadcast", label: "Broadcast", icon: Megaphone },
  { to: "/import", label: "Import Excel", icon: FileSpreadsheet }
];
const clientItems = [
  { to: "/app", label: "Home", icon: LayoutDashboard },
  { to: "/matches", label: "My matches", icon: Sparkles },
  { to: "/inventory", label: "My listings", icon: Building2 },
  { to: "/pipeline", label: "My deals", icon: ListChecks }
];
function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const items = user?.role === "broker" ? brokerItems : clientItems;
  return /* @__PURE__ */ jsxs("aside", { className: "hidden md:flex w-64 shrink-0 flex-col gradient-ink text-sidebar-foreground", children: [
    /* @__PURE__ */ jsx("div", { className: "px-6 pt-7 pb-6 border-b border-sidebar-border", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "size-9 rounded-lg gradient-gold grid place-items-center", children: /* @__PURE__ */ jsx(Link2, { className: "size-5 text-primary -rotate-45" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-lg leading-none", children: "DealChain" }),
        /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-sidebar-foreground/60", children: user?.role === "broker" ? "Broker workspace" : "Deal floor" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 px-3 py-5 space-y-1", children: items.map((it) => {
      const active = pathname === it.to || pathname.startsWith(it.to + "/");
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to: it.to,
          className: cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          ),
          children: [
            /* @__PURE__ */ jsx(it.icon, { className: "size-4" }),
            it.label
          ]
        },
        it.to
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-4 py-4 border-t border-sidebar-border space-y-3", children: [
      user && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 px-2", children: [
        /* @__PURE__ */ jsx("div", { className: "size-8 rounded-full gradient-gold grid place-items-center text-[11px] font-semibold text-primary", children: user.name.split(" ").map((n) => n[0]).slice(0, 2).join("") }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[12px] font-medium truncate text-sidebar-foreground", children: user.name }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] capitalize text-sidebar-foreground/60", children: user.role })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            logout();
            navigate({ to: "/login" });
          },
          className: "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors",
          children: [
            /* @__PURE__ */ jsx(LogOut, { className: "size-3.5" }),
            " Sign out"
          ]
        }
      )
    ] })
  ] });
}
function AppShell({ children, title, subtitle, action }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex bg-background", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex flex-col", children: [
      /* @__PURE__ */ jsxs("header", { className: "md:hidden flex items-center justify-between px-4 h-14 border-b border-border", children: [
        /* @__PURE__ */ jsx(Link, { to: "/app", className: "font-display text-lg", children: "DealChain" }),
        /* @__PURE__ */ jsx(Menu, { className: "size-5" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "px-6 md:px-10 pt-8 pb-4 border-b border-border flex items-end justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-display", children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-2xl", children: subtitle })
        ] }),
        action
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 px-6 md:px-10 py-8", children })
    ] })
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
export {
  AppShell as A,
  Badge as B
};
