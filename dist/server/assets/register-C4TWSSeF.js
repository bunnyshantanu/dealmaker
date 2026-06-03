import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { C as Card } from "./card-BbF6o9Kw.js";
import { I as Input } from "./input-DVeAuAgX.js";
import { L as Label } from "./label-DOAnQvhy.js";
import { B as Button } from "./button-Cz8PAkJh.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import { u as useAuth } from "./router-CxU_Q1IW.js";
import { useState, useEffect, useMemo } from "react";
import { Link2, Check } from "lucide-react";
import { toast } from "sonner";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "zustand";
import "zustand/middleware";
function RegisterPage() {
  const navigate = useNavigate();
  const {
    contacts,
    addContact
  } = useStore();
  const {
    registerAndLogin
  } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "client",
    userType: "buyer",
    referredBy: ""
  });
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (done && form.accountType === "client") {
      const loginRes = registerAndLogin(form.email, form.name, "client", form.password, form.userType);
      if (loginRes.ok) {
        toast.success("Welcome! You're now logged in.");
        const redirectTo = form.userType === "seller" ? "/hello" : "/app";
        navigate({
          to: redirectTo
        });
      }
    }
  }, [done, form.accountType, form.email, form.name, form.password, form.userType, registerAndLogin, navigate]);
  useMemo(() => {
    if (form.accountType !== "broker" || !form.referredBy.trim()) return [];
    const q = form.referredBy.trim().toLowerCase();
    return contacts.filter((c) => c.role === "broker" && c.name.toLowerCase().includes(q)).slice(0, 4);
  }, [contacts, form.accountType, form.referredBy]);
  const submit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Name, phone and email are required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!form.password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const existing = contacts.find((c) => c.phone.replace(/\s+/g, "") === form.phone.replace(/\s+/g, ""));
    if (existing) {
      toast.success(`Welcome back, ${existing.name.split(" ")[0]}!`);
      setDone(true);
      return;
    }
    const role = form.accountType === "broker" ? "broker" : "buyer";
    const matchedReferrer = form.accountType === "broker" && form.referredBy ? contacts.find((c) => c.role === "broker" && c.name.toLowerCase() === form.referredBy.trim().toLowerCase()) : void 0;
    addContact({
      name: form.name,
      phone: form.phone,
      email: form.email,
      role,
      source: matchedReferrer ? "Referral" : "External",
      referredBy: matchedReferrer?.id,
      reliability: 50,
      tags: ["🆕 New"],
      verified: false
    });
    setDone(true);
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen grid place-items-center p-6 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "size-12 mx-auto rounded-xl bg-foreground text-background grid place-items-center mb-4", children: /* @__PURE__ */ jsx(Link2, { className: "size-6 -rotate-45" }) }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-display", children: [
        "Join ",
        /* @__PURE__ */ jsx("span", { className: "underline decoration-2 underline-offset-4", children: "DealChain" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-md mx-auto", children: "We'll match your information in seconds, keep matching it as the data grows, and get back to you with your next step." })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "p-7", children: done ? /* @__PURE__ */ jsxs("div", { className: "text-center py-6", children: [
      /* @__PURE__ */ jsx("div", { className: "size-14 mx-auto rounded-full bg-foreground text-background grid place-items-center mb-4", children: /* @__PURE__ */ jsx(Check, { className: "size-7" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-display", children: "You're in." }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Your information has entered the DealChain network. We'll get back to you with your next step." }),
      /* @__PURE__ */ jsx(Button, { className: "mt-5", variant: "outline", onClick: () => {
        setDone(false);
        setForm({
          name: "",
          phone: "",
          email: "",
          accountType: "client",
          userType: "buyer",
          referredBy: ""
        });
      }, children: "Register another" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "mb-2 block", children: "Are you a broker or a direct client?" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: [{
          v: "client",
          label: "Direct client",
          hint: "Buyer or seller"
        }, {
          v: "broker",
          label: "Broker",
          hint: "Real estate agent"
        }].map((opt) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setForm({
          ...form,
          accountType: opt.v
        }), className: "py-3 px-3 rounded-lg border text-left transition-all " + (form.accountType === opt.v ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40"), children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: opt.label }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] mt-0.5 " + (form.accountType === opt.v ? "text-background/70" : "text-muted-foreground"), children: opt.hint })
        ] }, opt.v)) }),
        form.accountType === "client" && /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-2", children: "As a direct client you can post both requirements (to buy) and inventory (to sell) from one account." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Full name" }),
        /* @__PURE__ */ jsx(Input, { value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), placeholder: "Your full name" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Contact number" }),
        /* @__PURE__ */ jsx(Input, { value: form.phone, onChange: (e) => setForm({
          ...form,
          phone: e.target.value
        }), placeholder: "+91 98xxx xxxxx" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Label, { children: [
          "Email ",
          /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(Input, { type: "email", value: form.email, onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }), placeholder: "you@example.com" }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "All match notifications go to your email." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Label, { children: [
          "Password ",
          /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(Input, { type: "password", value: form.password, onChange: (e) => setForm({
          ...form,
          password: e.target.value
        }), placeholder: "••••••••" }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "At least 6 characters for security." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Label, { children: [
          "Confirm Password ",
          /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(Input, { type: "password", value: form.confirmPassword, onChange: (e) => setForm({
          ...form,
          confirmPassword: e.target.value
        }), placeholder: "••••••••" })
      ] }),
      /* @__PURE__ */ jsx(Button, { onClick: submit, className: "w-full bg-foreground text-background hover:bg-foreground/90 mt-2", children: "Register" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-muted-foreground text-center", children: [
        "Already part of the network? ",
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "underline", children: "Sign in" })
      ] })
    ] }) })
  ] }) });
}
export {
  RegisterPage as component
};
