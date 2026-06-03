import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { B as Button } from "./button-Cz8PAkJh.js";
import { I as Input } from "./input-DVeAuAgX.js";
import { L as Label } from "./label-DOAnQvhy.js";
import { u as useAuth, D as DEMO_ACCOUNTS } from "./router-CxU_Q1IW.js";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "zustand";
import "zustand/middleware";
function LoginPage() {
  const navigate = useNavigate();
  const {
    user,
    login
  } = useAuth();
  const [role, setRole] = useState("broker");
  const [email, setEmail] = useState("broker@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      const redirectTo = user.userType === "seller" ? "/hello" : "/app";
      console.log("🔍 Login redirect:", {
        email: user.email,
        userType: user.userType,
        redirectTo
      });
      navigate({
        to: redirectTo
      });
    }
  }, [user, navigate]);
  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = login(email, password);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Welcome back");
    setTimeout(() => {
      const currentUser = useAuth.getState().user;
      if (currentUser?.userType === "seller") {
        navigate({
          to: "/hello"
        });
      } else {
        navigate({
          to: "/app"
        });
      }
    }, 100);
  }
  function fillDemo(d) {
    setEmail(d.email);
    setPassword(d.password);
    setRole(d.role.toLowerCase());
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen grid md:grid-cols-2 bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col px-6 md:px-12 py-8", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 w-fit", children: [
        /* @__PURE__ */ jsx("div", { className: "size-8 rounded-[10px] bg-foreground text-background grid place-items-center font-display font-semibold", children: "DC" }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-[17px]", children: "DealChain" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md mx-auto", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-[36px] md:text-[44px] leading-tight tracking-tight", children: "Sign in" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-[14px] text-muted-foreground", children: [
          "Continue to your deal floor. New here?",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/register", className: "underline text-foreground", children: "Create account" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit, className: "mt-6 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@company.com", required: true, className: "h-11" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", required: true, className: "h-11" })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full h-11 rounded-full bg-foreground text-background hover:bg-foreground/90", children: loading ? "Signing in…" : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Sign in ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "size-4 ml-1" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-secondary/50 p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3", children: "Demo accounts · tap to autofill" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: DEMO_ACCOUNTS.map((d) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => fillDemo(d), className: "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-background border border-border hover:border-foreground/40 transition-colors text-left", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[12px] font-medium", children: d.role }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted-foreground", children: d.email })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-[11px] tabular-nums text-muted-foreground", children: d.password })
          ] }, d.email)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-[12px] text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " DealChain"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex relative bg-foreground text-background flex-col justify-between p-12 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[12px] uppercase tracking-[0.18em] text-background/60", children: "The intelligence engine" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-display text-[44px] leading-[1.05] tracking-tight max-w-md", children: [
          "Stop chasing.",
          /* @__PURE__ */ jsx("br", {}),
          "Start closing."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-[15px] text-background/70 max-w-md leading-relaxed", children: "Sign in to see your live matches, reliability scores and active deal pipeline in real time." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4", children: [{
        k: "1,240",
        v: "Active requirements"
      }, {
        k: "340+",
        v: "Brokers on floor"
      }, {
        k: "₹70L",
        v: "Avg trade spread"
      }].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-background/15 p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-[22px]", children: s.k }),
        /* @__PURE__ */ jsx("div", { className: "text-[11px] text-background/60 mt-1", children: s.v })
      ] }, s.v)) })
    ] })
  ] });
}
export {
  LoginPage as component
};
