import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, DEMO_ACCOUNTS, type AuthRole } from "@/store/useAuth";
import { ArrowRight, Building2, KeyRound } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — DealChain" },
      { name: "description", content: "Sign in to your DealChain network." },
    ],
  }),
});

const ROLES: { value: AuthRole; label: string; icon: typeof Building2 }[] = [
  { value: "broker", label: "Broker", icon: KeyRound },
  { value: "client", label: "Direct Client", icon: Building2 },
];

function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [role, setRole] = useState<AuthRole>("broker");
  const [email, setEmail] = useState("broker@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const redirectTo = user.userType === "seller" ? "/hello" : "/app";
      console.log("🔍 Login redirect:", { email: user.email, userType: user.userType, redirectTo });
      navigate({ to: redirectTo });
    }
  }, [user, navigate]);

  function pickRole(r: AuthRole) {
    setRole(r);
    const demo = DEMO_ACCOUNTS.find((d) => d.role.toLowerCase() === r);
    if (demo) setEmail(demo.email);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = login(email, password);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Welcome back");
    // Use a small timeout to ensure state is persisted and updated
    setTimeout(() => {
      const currentUser = useAuth.getState().user;
      if (currentUser?.userType === "seller") {
        navigate({ to: "/hello" });
      } else {
        navigate({ to: "/app" });
      }
    }, 100);
  }

  function fillDemo(d: (typeof DEMO_ACCOUNTS)[number]) {
    setEmail(d.email);
    setPassword(d.password);
    setRole(d.role.toLowerCase() as AuthRole);
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background text-foreground">
      {/* Left — form */}
      <div className="flex flex-col px-6 md:px-12 py-8">
        <Link to="/" className="inline-flex items-center gap-2 w-fit">
          <div className="size-8 rounded-[10px] bg-foreground text-background grid place-items-center font-display font-semibold">DC</div>
          <span className="font-display text-[17px]">DealChain</span>
        </Link>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h1 className="font-display text-[36px] md:text-[44px] leading-tight tracking-tight">Sign in</h1>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Continue to your deal floor. New here?{" "}
              <Link to="/register" className="underline text-foreground">Create account</Link>.
            </p>

            {/* Role selector */}
            {/* <div className="mt-7 grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => pickRole(r.value)}
                  className={
                    "flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-colors text-[12px] " +
                    (role === r.value
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background hover:border-foreground/40")
                  }
                >
                  <r.icon className="size-4" />
                  {r.label}
                </button>
              ))}
            </div> */}

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                {loading ? "Signing in…" : (<>Sign in <ArrowRight className="size-4 ml-1" /></>)}
              </Button>
            </form>

            {/* Demo credentials */}
            {/* <div className="mt-8 rounded-2xl border border-border bg-secondary/50 p-4">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                Demo accounts · tap to autofill
              </div>
              <div className="space-y-2">
                {DEMO_ACCOUNTS.map((d) => (
                  <button
                    key={d.email}
                    type="button"
                    onClick={() => fillDemo(d)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-background border border-border hover:border-foreground/40 transition-colors text-left"
                  >
                    <div>
                      <div className="text-[12px] font-medium">{d.role}</div>
                      <div className="text-[11px] text-muted-foreground">{d.email}</div>
                    </div>
                    <div className="text-[11px] tabular-nums text-muted-foreground">{d.password}</div>
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        <div className="text-[12px] text-muted-foreground">
          © {new Date().getFullYear()} DealChain
        </div>
      </div>

      {/* Right — visual */}
      <div className="hidden md:flex relative bg-foreground text-background flex-col justify-between p-12 overflow-hidden">
        <div className="text-[12px] uppercase tracking-[0.18em] text-background/60">The intelligence engine</div>
        <div>
          <h2 className="font-display text-[44px] leading-[1.05] tracking-tight max-w-md">
            Stop chasing.<br />Start closing.
          </h2>
          <p className="mt-5 text-[15px] text-background/70 max-w-md leading-relaxed">
            Sign in to see your live matches, reliability scores and active deal pipeline in real time.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[{ k: "1,240", v: "Active requirements" }, { k: "340+", v: "Brokers on floor" }, { k: "₹70L", v: "Avg trade spread" }].map((s) => (
            <div key={s.v} className="rounded-xl border border-background/15 p-4">
              <div className="font-display text-[22px]">{s.k}</div>
              <div className="text-[11px] text-background/60 mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}