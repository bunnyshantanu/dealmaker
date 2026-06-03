import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { B as Button } from "./button-Cz8PAkJh.js";
import { u as useAuth } from "./router-CxU_Q1IW.js";
import { LogOut } from "lucide-react";
import "react";
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
function HelloPage() {
  const {
    user,
    logout
  } = useAuth();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground flex flex-col", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-[14px] text-muted-foreground", children: [
          "Hi, ",
          user?.name.split(" ")[0]
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
          logout();
        }, className: "rounded-full", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "size-3.5 mr-1.5" }),
          "Logout"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-[96px] md:text-[128px] leading-none tracking-tight mb-6", children: "Hello" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[18px] text-muted-foreground mb-8", children: [
        "Welcome, ",
        user?.name
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "rounded-full bg-foreground text-background hover:bg-foreground/90", children: /* @__PURE__ */ jsx(Link, { to: "/app", children: "Go to Dashboard" }) })
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
  HelloPage as component
};
