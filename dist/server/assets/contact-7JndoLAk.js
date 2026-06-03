import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { B as Button } from "./button-Cz8PAkJh.js";
import { I as Input } from "./input-DVeAuAgX.js";
import { L as Label } from "./label-DOAnQvhy.js";
import { T as Textarea } from "./textarea-CIfPmIKy.js";
import { ArrowLeft, Mail, Phone, MapPin, Check } from "lucide-react";
import { toast } from "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "broker",
    message: ""
  });
  function update(k, v) {
    setForm((f) => ({
      ...f,
      [k]: v
    }));
  }
  function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setSent(true);
    toast.success("Message received. We'll be in touch within 24 hours.");
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "size-8 rounded-[10px] bg-foreground text-background grid place-items-center font-display font-semibold", children: "DC" }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-[17px]", children: "DealChain" })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-[13px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "size-3.5" }),
        " Back home"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-[1fr_1.1fr] gap-14", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-[12px] uppercase tracking-[0.18em] text-muted-foreground", children: "Contact us" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]", children: "Let's get you on the floor." }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-[16px] text-muted-foreground max-w-md leading-relaxed", children: "Whether you're a broker or a direct client — tell us a bit about yourself and we'll set you up on the deal floor." }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 space-y-5", children: [{
          icon: Mail,
          label: "Email",
          value: "hello@dealchain.in"
        }, {
          icon: Phone,
          label: "Phone",
          value: "+91 98100 00000"
        }, {
          icon: MapPin,
          label: "Region",
          value: "Delhi NCR · India"
        }].map((c) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "size-10 rounded-lg border border-border grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(c.icon, { className: "size-4" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: c.label }),
            /* @__PURE__ */ jsx("div", { className: "text-[15px] mt-0.5", children: c.value })
          ] })
        ] }, c.label)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-3xl border border-border bg-card p-7 md:p-9", children: sent ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsx("div", { className: "size-14 rounded-full bg-foreground text-background grid place-items-center mx-auto", children: /* @__PURE__ */ jsx(Check, { className: "size-6" }) }),
        /* @__PURE__ */ jsx("h2", { className: "mt-6 font-display text-[28px]", children: "Message received" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-[14px] text-muted-foreground max-w-sm mx-auto", children: "We'll reach out within 24 hours. In the meantime, take the floor for a spin." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-2 justify-center", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, className: "rounded-full bg-foreground text-background hover:bg-foreground/90", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Sign in" }) }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, className: "rounded-full", children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Register" }) })
        ] })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Full name" }),
            /* @__PURE__ */ jsx(Input, { id: "name", value: form.name, onChange: (e) => update("name", e.target.value), className: "h-11", placeholder: "Aman Kapoor" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone" }),
            /* @__PURE__ */ jsx(Input, { id: "phone", value: form.phone, onChange: (e) => update("phone", e.target.value), className: "h-11", placeholder: "+91 98100 00000" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(Input, { id: "email", type: "email", value: form.email, onChange: (e) => update("email", e.target.value), className: "h-11", placeholder: "you@company.com" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "I am a" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: [{
            v: "broker",
            l: "Broker"
          }, {
            v: "client",
            l: "Direct Client"
          }].map((r) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => update("role", r.v), className: "py-2.5 rounded-lg border text-[13px] transition-colors " + (form.role === r.v ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:border-foreground/40"), children: r.l }, r.v)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "message", children: "How can we help?" }),
          /* @__PURE__ */ jsx(Textarea, { id: "message", value: form.message, onChange: (e) => update("message", e.target.value), rows: 5, placeholder: "Tell us about your network and where you operate…" })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full h-11 rounded-full bg-foreground text-background hover:bg-foreground/90", children: "Send message" }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground text-center", children: "We respect your inbox. No spam, ever." })
      ] }) })
    ] })
  ] });
}
export {
  ContactPage as component
};
