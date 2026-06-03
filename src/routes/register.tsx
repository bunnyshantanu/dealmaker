import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/store/useAuth";
import { useMemo, useState, useEffect } from "react";
import { Link2, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Register on DealChain — Real estate deal intelligence" },
      { name: "description", content: "Brokers and direct clients: register to share inventory or requirements and discover deals." },
    ],
  }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const { contacts, addContact } = useStore();
  const { registerAndLogin } = useAuth();
  // Phase 2: Broker vs Direct Client (a direct client can post BOTH requirement and inventory).
  // Internally we still store role; for direct clients we default to "buyer" (the dashboard treats both buyer/seller alike).
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "client" as "broker" | "client",
    userType: "buyer" as "buyer" | "seller",
    referredBy: "",
  });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done && form.accountType === "client") {
      // Auto-login direct clients after registration
      const loginRes = registerAndLogin(form.email, form.name, "client", form.password, form.userType);
      if (loginRes.ok) {
        toast.success("Welcome! You're now logged in.");
        const redirectTo = form.userType === "seller" ? "/hello" : "/app";
        navigate({ to: redirectTo });
      }
    }
  }, [done, form.accountType, form.email, form.name, form.password, form.userType, registerAndLogin, navigate]);

  // Referral autocomplete (brokers only)
  const brokerSuggestions = useMemo(() => {
    if (form.accountType !== "broker" || !form.referredBy.trim()) return [];
    const q = form.referredBy.trim().toLowerCase();
    return contacts
      .filter((c) => c.role === "broker" && c.name.toLowerCase().includes(q))
      .slice(0, 4);
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
    const existing = contacts.find(c => c.phone.replace(/\s+/g, "") === form.phone.replace(/\s+/g, ""));
    if (existing) {
      toast.success(`Welcome back, ${existing.name.split(" ")[0]}!`);
      setDone(true);
      return;
    }
    const role: "broker" | "buyer" = form.accountType === "broker" ? "broker" : "buyer";
    const matchedReferrer = form.accountType === "broker" && form.referredBy
      ? contacts.find((c) => c.role === "broker" && c.name.toLowerCase() === form.referredBy.trim().toLowerCase())
      : undefined;
    addContact({
      name: form.name,
      phone: form.phone,
      email: form.email,
      role,
      source: matchedReferrer ? "Referral" : "External",
      referredBy: matchedReferrer?.id,
      reliability: 50,
      tags: ["🆕 New"],
      verified: false,
    });
    setDone(true);
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-background">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="size-12 mx-auto rounded-xl bg-foreground text-background grid place-items-center mb-4">
            <Link2 className="size-6 -rotate-45" />
          </div>
          <h1 className="text-4xl font-display">Join <span className="underline decoration-2 underline-offset-4">DealChain</span></h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            We'll match your information in seconds, keep matching it as the data grows,
            and get back to you with your next step.
          </p>
        </div>

        <Card className="p-7">
          {done ? (
            <div className="text-center py-6">
              <div className="size-14 mx-auto rounded-full bg-foreground text-background grid place-items-center mb-4">
                <Check className="size-7" />
              </div>
              <h2 className="text-2xl font-display">You're in.</h2>
              <p className="text-sm text-muted-foreground mt-2">Your information has entered the DealChain network. We'll get back to you with your next step.</p>
              <Button className="mt-5" variant="outline" onClick={() => { setDone(false); setForm({ name: "", phone: "", email: "", accountType: "client", userType: "buyer", referredBy: "" }); }}>
                Register another
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Are you a broker or a direct client?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { v: "client", label: "Direct client", hint: "Buyer or seller" },
                    { v: "broker", label: "Broker", hint: "Real estate agent" },
                  ] as const).map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setForm({ ...form, accountType: opt.v })}
                      className={
                        "py-3 px-3 rounded-lg border text-left transition-all " +
                        (form.accountType === opt.v
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground/40")
                      }
                    >
                      <div className="text-sm font-medium">{opt.label}</div>
                      <div className={"text-[11px] mt-0.5 " + (form.accountType === opt.v ? "text-background/70" : "text-muted-foreground")}>{opt.hint}</div>
                    </button>
                  ))}
                </div>
                {form.accountType === "client" && (
                  <p className="text-[11px] text-muted-foreground mt-2">
                    As a direct client you can post both requirements (to buy) and inventory (to sell) from one account.
                  </p>
                )}
              </div>

              <div>
                <Label>Full name</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </div>
              <div>
                <Label>Contact number</Label>
                <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98xxx xxxxx" />
              </div>
              <div>
                <Label>Email <span className="text-destructive">*</span></Label>
                <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                <p className="text-[11px] text-muted-foreground mt-1">All match notifications go to your email.</p>
              </div>

              <div>
                <Label>Password <span className="text-destructive">*</span></Label>
                <Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
                <p className="text-[11px] text-muted-foreground mt-1">At least 6 characters for security.</p>
              </div>

              <div>
                <Label>Confirm Password <span className="text-destructive">*</span></Label>
                <Input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} placeholder="••••••••" />
              </div>

              {/* Referred by — brokers only (avoid conflict of interest for clients) */}
              {/* {form.accountType === "broker" && (
                <div className="relative">
                  <Label>Referred by (optional)</Label>
                  <Input
                    value={form.referredBy}
                    onChange={(e) => setForm({ ...form, referredBy: e.target.value })}
                    placeholder="Type broker name…"
                  />
                  {brokerSuggestions.length > 0 && (
                    <div className="absolute z-10 left-0 right-0 mt-1 rounded-lg border border-border bg-background shadow-lg overflow-hidden">
                      {brokerSuggestions.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setForm({ ...form, referredBy: s.name })}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-muted/60 flex items-center justify-between"
                        >
                          <span>{s.name}</span>
                          <span className="text-[11px] text-muted-foreground">{s.phone}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )} */}

              <Button onClick={submit} className="w-full bg-foreground text-background hover:bg-foreground/90 mt-2">Register</Button>
              <p className="text-[11px] text-muted-foreground text-center">
                Already part of the network? <Link to="/login" className="underline">Sign in</Link>
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
