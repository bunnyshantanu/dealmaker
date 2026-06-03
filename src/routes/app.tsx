import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { useStore } from "@/store/useStore";
import { buildMatches, formatINR, formatYards } from "@/lib/match";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Bell, Flame, Plus, Sparkles, TrendingUp, Users, Target } from "lucide-react";
import { useAuth } from "@/store/useAuth";

export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const user = useAuth.getState().user;
      if (!user) throw redirect({ to: "/login" });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const { contacts, listings, deals } = useStore();
  const matches = buildMatches(listings);

  // ---------- CLIENT (Direct Buyer / Seller) DASHBOARD ----------
  if (user?.role === "client") {
    const topMatches = matches.slice(0, 4);
    const myDeals = deals.filter((d) => d.stage !== "Dropped" && d.stage !== "Closed").slice(0, 4);

    return (
      <AppShell
        title={`Welcome, ${user.name.split(" ")[0]}.`}
        subtitle="Your matches, your deals, your opportunities — all in one place."
        action={
          <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90">
            <Link to="/inventory"><Plus className="size-4" /> Post requirement or inventory</Link>
          </Button>
        }
      >
        <div className="grid lg:grid-cols-3 gap-5">
          {/* My Matches — main column */}
          <Card className="lg:col-span-2 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-display">My matches</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Relevant opportunities found for you</p>
              </div>
              <Link to="/matches" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                See all <ArrowUpRight className="size-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {topMatches.length === 0 && (
                <div className="text-center py-12">
                  <Sparkles className="size-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No matches yet — post a requirement or inventory to get started.</p>
                </div>
              )}
              {topMatches.map((m) => {
                const buyer = listings.find((l) => l.id === m.buyerListingId)!;
                const seller = listings.find((l) => l.id === m.sellerListingId)!;
                const buyerC = contacts.find((c) => c.id === buyer.ownerId);
                const sellerC = contacts.find((c) => c.id === seller.ownerId);
                const trading = m.score >= 80 && m.outcomes.includes("Trading");
                return (
                  <div
                    key={m.id}
                    className="rounded-xl border border-border p-4 hover:border-foreground/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        {buyer.propertyType} · {buyer.location}
                      </div>
                      <div className="flex items-center gap-2">
                        {trading && <Badge className="bg-fire/15 text-fire border-0 text-[10px]">Trading possibility</Badge>}
                        <div className="px-2.5 py-0.5 rounded-full bg-foreground text-background text-[11px] font-semibold">{m.score}%</div>
                      </div>
                    </div>
                    <p className="text-[14px] leading-snug">
                      <span className="font-medium">{buyerC?.name}</span> requires{" "}
                      <span className="font-medium">{formatINR(buyer.budgetMax || buyer.budgetMin)}</span> property ·{" "}
                      <span className="font-medium">{sellerC?.name}</span> offering{" "}
                      <span className="font-medium">{formatINR(seller.budgetMin || seller.budgetMax)}</span> property
                    </p>
                    <div className="mt-2 text-[12px] text-muted-foreground">{formatYards(seller.sizeMin, seller.sizeMax)}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Side column: notifications + active deals */}
          <div className="space-y-5">
            <Card className="p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="size-4" />
                <h2 className="text-base font-display">Notifications</h2>
              </div>
              <div className="space-y-3 text-[13px]">
                <div className="rounded-lg bg-secondary/60 p-3">
                  <div className="font-medium">2 new matches in Greater Kailash</div>
                  <div className="text-muted-foreground text-[11px] mt-0.5">Just now</div>
                </div>
                <div className="rounded-lg bg-secondary/60 p-3">
                  <div className="font-medium">Team will reach out about your Vasant Vihar requirement</div>
                  <div className="text-muted-foreground text-[11px] mt-0.5">2 hours ago</div>
                </div>
              </div>
            </Card>

            <Card className="p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-display">My active deals</h2>
                <Link to="/pipeline" className="text-[11px] text-muted-foreground hover:text-foreground">View all</Link>
              </div>
              <div className="space-y-2.5">
                {myDeals.length === 0 && <p className="text-xs text-muted-foreground">No active deals yet.</p>}
                {myDeals.map((d) => (
                  <div key={d.id} className="rounded-lg border border-border p-3">
                    <div className="text-[13px] font-medium leading-tight">{d.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
                      <span>Stage: {d.stage}</span>
                      <span>{formatINR(d.value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* What happens next reassurance */}
        <Card className="mt-6 p-6 rounded-2xl bg-secondary/40 border-dashed">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-full bg-foreground text-background grid place-items-center shrink-0">
              <Sparkles className="size-4" />
            </div>
            <div>
              <div className="font-display text-[18px]">What happens next?</div>
              <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed max-w-2xl">
                Your information is part of the DealChain network. Matching runs continuously as new
                requirements and inventory are added. You'll get notified for every relevant opportunity,
                and our team will reach out when a high-fit deal is identified.
              </p>
            </div>
          </div>
        </Card>
      </AppShell>
    );
  }

  // ---------- BROKER (Admin) DASHBOARD ----------
  const topMatches = matches.slice(0, 4);
  const newUsers = contacts.filter((c) => Date.now() - new Date(c.createdAt).getTime() < 7 * 86400000);
  const closedValue = deals.filter((d) => d.stage === "Closed").reduce((s, d) => s + d.value, 0);
  const pipelineValue = deals.filter((d) => d.stage !== "Dropped" && d.stage !== "Closed").reduce((s, d) => s + d.value, 0);

  return (
    <AppShell
      title="Today's deal floor"
      subtitle="Your network at a glance — matches, momentum, and money on the table."
      action={
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link to="/broadcast">Send broadcast</Link></Button>
          <Button asChild className="bg-foreground text-background hover:bg-foreground/90"><Link to="/matches">View matches</Link></Button>
        </div>
      }
    >
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat icon={Sparkles} label="Live matches" value={String(matches.length)} hint={`${matches.filter((m) => m.score >= 80).length} ≥ 80%`} />
        <Stat icon={TrendingUp} label="Pipeline value" value={formatINR(pipelineValue)} hint={`${deals.filter((d) => d.stage !== "Closed" && d.stage !== "Dropped").length} active deals`} />
        <Stat icon={Target} label="Closed YTD" value={formatINR(closedValue)} />
        <Stat icon={Users} label="Network" value={String(contacts.length)} hint={`${newUsers.length} joined this week`} />
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display">Top matches</h2>
          <Link to="/matches" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            See all <ArrowUpRight className="size-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {topMatches.length === 0 && <p className="text-sm text-muted-foreground">No matches yet.</p>}
          {topMatches.map((m) => {
            const buyer = listings.find((l) => l.id === m.buyerListingId)!;
            const seller = listings.find((l) => l.id === m.sellerListingId)!;
            const buyerC = contacts.find((c) => c.id === buyer.ownerId);
            const sellerC = contacts.find((c) => c.id === seller.ownerId);
            const trading = m.score >= 80;
            return (
              <div key={m.id} className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border hover:border-foreground/30 transition-colors">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{buyer.propertyType} · {buyer.location} · {formatYards(seller.sizeMin, seller.sizeMax)}</div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">
                    {buyerC?.name} ({formatINR(buyer.budgetMax)}) × {sellerC?.name} ({formatINR(seller.budgetMin)})
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {trading && <Badge className="bg-fire/15 text-fire border-0 text-[10px]"><Flame className="size-3 mr-1" /> Trading</Badge>}
                  <div className="px-3 py-1 rounded-full text-xs font-semibold bg-foreground text-background">{m.score}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </AppShell>
  );
}

function Stat({ icon: Icon, label, value, hint }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="text-3xl font-display mt-2">{value}</div>
          {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
        </div>
        <div className="size-10 rounded-lg bg-secondary grid place-items-center">
          <Icon className="size-5" />
        </div>
      </div>
    </Card>
  );
}