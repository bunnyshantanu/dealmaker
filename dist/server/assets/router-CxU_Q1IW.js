import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createRootRoute, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter, useRouter } from "@tanstack/react-router";
import { Toaster as Toaster$1 } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const appCss = "/assets/styles-qQr7IzGz.css";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$e = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DealChain — Stop chasing. Start closing." },
      { name: "description", content: "AI-powered real estate deal intelligence and matchmaking. Match requirements with inventory, track every deal, close faster." },
      { name: "author", content: "DealChain" },
      { property: "og:title", content: "DealChain — Stop chasing. Start closing." },
      { property: "og:description", content: "AI-powered real estate deal intelligence and matchmaking network." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@DealChain" },
      { name: "twitter:title", content: "DealChain — Stop chasing. Start closing." },
      { name: "twitter:description", content: "AI-powered real estate deal intelligence and matchmaking network." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ec0ce527-a2b6-4d00-8f7d-0f0cbdcfeb5b/id-preview-a51334f8--432b7c3e-2d57-4fb3-b83f-67b6264f5def.lovable.app-1777894124144.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ec0ce527-a2b6-4d00-8f7d-0f0cbdcfeb5b/id-preview-a51334f8--432b7c3e-2d57-4fb3-b83f-67b6264f5def.lovable.app-1777894124144.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" })
  ] });
}
const CREDENTIALS = {
  "broker@gmail.com": { password: "broker@123", role: "broker", name: "Broker Demo" },
  "client@gmail.com": { password: "client@123", role: "client", name: "Direct Client Demo", userType: "buyer" },
  // Legacy demo accounts (mapped to client)
  "buyer@gmail.com": { password: "buyer@123", role: "client", name: "Buyer Demo", userType: "buyer" },
  "seller@gmail.com": { password: "seller@123", role: "client", name: "Seller Demo", userType: "seller" }
};
const useAuth = create()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const key = email.trim().toLowerCase();
        const rec = CREDENTIALS[key];
        if (!rec) return { ok: false, error: "No account found for this email." };
        if (rec.password !== password) return { ok: false, error: "Incorrect password." };
        set({ user: { email: key, role: rec.role, name: rec.name, userType: rec.userType } });
        return { ok: true };
      },
      registerAndLogin: (email, name, role, password, userType) => {
        const key = email.trim().toLowerCase();
        CREDENTIALS[key] = { password, role, name, userType };
        set({ user: { email: key, role, name, userType } });
        return { ok: true };
      },
      logout: () => set({ user: null })
    }),
    { name: "dealmaker-auth-v1" }
  )
);
const DEMO_ACCOUNTS = [
  { role: "Broker", email: "broker@gmail.com", password: "broker@123" },
  { role: "Direct Client", email: "client@gmail.com", password: "client@123" }
];
const $$splitComponentImporter$d = () => import("./seller-B5J_qyCH.js");
const Route$d = createFileRoute("/seller")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const user = useAuth.getState().user;
      if (!user || user.userType !== "seller") throw redirect({
        to: "/app"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component"),
  head: () => ({
    meta: [{
      title: "Sell Property — DealChain"
    }, {
      name: "description",
      content: "Post your property for sale and connect with serious buyers on DealChain."
    }]
  })
});
const $$splitComponentImporter$c = () => import("./register-C4TWSSeF.js");
const Route$c = createFileRoute("/register")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component"),
  head: () => ({
    meta: [{
      title: "Register on DealChain — Real estate deal intelligence"
    }, {
      name: "description",
      content: "Brokers and direct clients: register to share inventory or requirements and discover deals."
    }]
  })
});
const $$splitComponentImporter$b = () => import("./pipeline-BmIo68LT.js");
const Route$b = createFileRoute("/pipeline")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./new-users-2qCcZnVt.js");
const Route$a = createFileRoute("/new-users")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./matches-BApydigc.js");
const Route$9 = createFileRoute("/matches")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./login-Bq8RUpW5.js");
const Route$8 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  head: () => ({
    meta: [{
      title: "Sign in — DealChain"
    }, {
      name: "description",
      content: "Sign in to your DealChain network."
    }]
  })
});
const $$splitComponentImporter$7 = () => import("./inventory-CVxdTTG-.js");
const Route$7 = createFileRoute("/inventory")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./import-DEOHax9o.js");
const Route$6 = createFileRoute("/import")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./hello-BCyoDcqT.js");
const Route$5 = createFileRoute("/hello")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const user = useAuth.getState().user;
      if (!user || user.userType !== "seller") throw redirect({
        to: "/"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => ({
    meta: [{
      title: "Welcome — DealChain"
    }, {
      name: "description",
      content: "Welcome to your seller dashboard on DealChain."
    }]
  })
});
const $$splitComponentImporter$4 = () => import("./contacts-BdVuXjFx.js");
const Route$4 = createFileRoute("/contacts")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./contact-7JndoLAk.js");
const Route$3 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "Contact us — DealChain"
    }, {
      name: "description",
      content: "Talk to the DealChain team. Private beta access, partnerships and broker onboarding."
    }, {
      property: "og:title",
      content: "Contact DealChain"
    }, {
      property: "og:description",
      content: "Private beta access, partnerships and broker onboarding."
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./broadcast-CvLZDbni.js");
const Route$2 = createFileRoute("/broadcast")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./app-DjgWGflk.js");
const Route$1 = createFileRoute("/app")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const user = useAuth.getState().user;
      if (!user) throw redirect({
        to: "/login"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BH-Sbgwj.js");
const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const user = useAuth.getState().user;
      if (user) {
        if (user.userType === "seller") throw redirect({
          to: "/hello"
        });
        throw redirect({
          to: "/app"
        });
      }
    }
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  head: () => ({
    meta: [{
      title: "DealChain — Stop chasing. Start closing."
    }, {
      name: "description",
      content: "Post your requirement or inventory in under 20 seconds. DealChain matches and re-matches deals continuously across a serious real estate network."
    }, {
      property: "og:title",
      content: "DealChain"
    }, {
      property: "og:description",
      content: "Stop chasing. Start closing."
    }]
  })
});
const SellerRoute = Route$d.update({
  id: "/seller",
  path: "/seller",
  getParentRoute: () => Route$e
});
const RegisterRoute = Route$c.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$e
});
const PipelineRoute = Route$b.update({
  id: "/pipeline",
  path: "/pipeline",
  getParentRoute: () => Route$e
});
const NewUsersRoute = Route$a.update({
  id: "/new-users",
  path: "/new-users",
  getParentRoute: () => Route$e
});
const MatchesRoute = Route$9.update({
  id: "/matches",
  path: "/matches",
  getParentRoute: () => Route$e
});
const LoginRoute = Route$8.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$e
});
const InventoryRoute = Route$7.update({
  id: "/inventory",
  path: "/inventory",
  getParentRoute: () => Route$e
});
const ImportRoute = Route$6.update({
  id: "/import",
  path: "/import",
  getParentRoute: () => Route$e
});
const HelloRoute = Route$5.update({
  id: "/hello",
  path: "/hello",
  getParentRoute: () => Route$e
});
const ContactsRoute = Route$4.update({
  id: "/contacts",
  path: "/contacts",
  getParentRoute: () => Route$e
});
const ContactRoute = Route$3.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$e
});
const BroadcastRoute = Route$2.update({
  id: "/broadcast",
  path: "/broadcast",
  getParentRoute: () => Route$e
});
const AppRoute = Route$1.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$e
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const rootRouteChildren = {
  IndexRoute,
  AppRoute,
  BroadcastRoute,
  ContactRoute,
  ContactsRoute,
  HelloRoute,
  ImportRoute,
  InventoryRoute,
  LoginRoute,
  MatchesRoute,
  NewUsersRoute,
  PipelineRoute,
  RegisterRoute,
  SellerRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  DEMO_ACCOUNTS as D,
  router as r,
  useAuth as u
};
