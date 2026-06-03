import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { useStore } from "@/store/useStore";
import { buildMatches, formatINR, scoreLabel } from "@/lib/match";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Flame, Handshake, Layers, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import type { DealType } from "@/lib/types";

export const Route = createFileRoute("/matches")({ component: MatchesPage });

const DT: (DealType | "All")[] = ["All", "Resale", "New", "Booking", "Collaboration"];

function MatchesPage() {
  const { listings, contacts, addDeal } = useStore();
  const [minUrgency, setMinUrgency] = useState(1);
  const [dealTypeFilter, setDealTypeFilter] = useState<DealType | "All">("All");

  const allMatches = buildMatches(listings);
  const matches = allMatches.filter(m =>
    (m.minUrgency ?? 0) >= minUrgency &&
    (dealTypeFilter === "All" || m.dealType === dealTypeFilter)
  );

  const create = (m: typeof allMatches[number]) => {
    const buyer = listings.find(l => l.id === m.buyerListingId)!;
    const seller = listings.find(l => l.id === m.sellerListingId)!;
    const buyerC = contacts.find(c => c.id === buyer.ownerId)!;
    const sellerC = contacts.find(c => c.id === seller.ownerId)!;
    const isCollab = m.outcomes.includes("Collaboration");
    const isTrading = m.outcomes.includes("Trading");
    addDeal({
      title: `${buyer.location} ${buyer.propertyType} — ${buyerC.name} × ${sellerC.name}`,
      buyerId: buyerC.id,
      sellerId: sellerC.id,
      brokerIds: [],
      type: isCollab ? "Collaboration" : isTrading ? "Trading" : "Brokerage",
      subtype: isCollab ? "collab" : isTrading ? "direct" : "1-table",
      stage: "Discussion",
      value: Math.round((seller.budgetMin + seller.budgetMax) / 2) || 0,
      matchId: m.id,
    });
    toast.success("Deal added to pipeline");
  };

  return (
    <AppShell title="Matches" subtitle={`${matches.length} of ${allMatches.length} match the filter.`}>
      <Card className="p-4 mb-5 flex flex-wrap items-center gap-6">
        <div className="flex-1 min-w-64">
          <Label className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Min urgency</span>
            <span className="font-semibold">{minUrgency}/10</span>
          </Label>
          <Slider value={[minUrgency]} min={1} max={10} step={1} onValueChange={(v) => setMinUrgency(v[0])} />
        </div>
        <div className="min-w-48">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Deal type</Label>
          <Select value={dealTypeFilter} onValueChange={(v) => setDealTypeFilter(v as DealType | "All")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{DT.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </Card>

      <div className="grid gap-4">
        {matches.map(m => {
          const buyer = listings.find(l => l.id === m.buyerListingId)!;
          const seller = listings.find(l => l.id === m.sellerListingId)!;
          const buyerC = contacts.find(c => c.id === buyer.ownerId);
          const sellerC = contacts.find(c => c.id === seller.ownerId);
          const lab = scoreLabel(m.score);
          const isCollab = m.outcomes.includes("Collaboration");
          const accent =
            isCollab ? "bg-fire/15 text-fire" :
            lab.tone === "fire" ? "bg-fire text-primary-foreground" :
            lab.tone === "success" ? "bg-success text-success-foreground" :
            lab.tone === "gold" ? "gradient-gold text-primary-foreground" :
            "bg-muted text-foreground";

          return (
            <Card key={m.id} className="p-5 md:p-6">
              <div className="flex flex-wrap items-start gap-6">
                <div className={"shrink-0 size-20 rounded-2xl grid place-items-center font-display " + accent}>
                  <div className="text-center">
                    <div className="text-2xl leading-none">{m.score}</div>
                    <div className="text-[10px] uppercase tracking-wider opacity-80 mt-0.5">Match</div>
                  </div>
                </div>

                <div className="flex-1 min-w-64">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Badge className={accent + " border-0"}>{isCollab ? "Collaboration match" : lab.label}</Badge>
                    {m.dealType && <Badge variant="outline">{m.dealType}</Badge>}
                    {m.outcomes.includes("Collaboration") && (
                      <Badge variant="outline" className="border-fire/40 text-fire">
                        <Layers className="size-3 mr-1" /> Collab
                      </Badge>
                    )}
                    {m.score >= 80 && !isCollab && (
                      <Badge variant="outline" className="border-fire/40 text-fire">
                        <Flame className="size-3 mr-1" /> Trading possibility
                      </Badge>
                    )}
                    {m.outcomes.includes("Brokerage") && (
                      <Badge variant="outline">
                        <Handshake className="size-3 mr-1" /> Brokerage
                      </Badge>
                    )}
                    {(m.minUrgency ?? 0) >= 8 && (
                      <Badge variant="outline" className="border-fire/40 text-fire">
                        <Flame className="size-3 mr-1" /> Urgent {m.minUrgency}/10
                      </Badge>
                    )}
                  </div>
                  <div className="text-lg font-display">{buyer.propertyType} · {buyer.location}</div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Buyer side</div>
                      <div className="font-medium mt-0.5">{buyerC?.name}</div>
                      <div className="text-muted-foreground text-xs">{formatINR(buyer.budgetMin)}–{formatINR(buyer.budgetMax)} · {buyer.sizeMin}–{buyer.sizeMax} sqft · urgency {buyer.urgency ?? "—"}/10</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Seller side</div>
                      <div className="font-medium mt-0.5">{sellerC?.name}</div>
                      <div className="text-muted-foreground text-xs">{formatINR(seller.budgetMin)}–{formatINR(seller.budgetMax)} · {seller.sizeMin}–{seller.sizeMax} sqft · urgency {seller.urgency ?? "—"}/10</div>
                    </div>
                  </div>
                  {m.spread !== undefined && m.spread > 0 && !isCollab && (
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-success">
                      <TrendingUp className="size-3.5" />
                      Hidden spread: {formatINR(m.spread)}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 self-stretch justify-center">
                  <Button onClick={() => create(m)} className="gradient-gold text-primary-foreground">
                    Add to pipeline <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
        {matches.length === 0 && <Card className="p-10 text-center text-sm text-muted-foreground">No matches at this filter — lower the urgency or widen deal type.</Card>}
      </div>
    </AppShell>
  );
}
