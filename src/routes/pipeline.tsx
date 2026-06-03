import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { useStore } from "@/store/useStore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/match";
import type { Stage } from "@/lib/types";
import { Check, Phone, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/pipeline")({ component: PipelinePage });

const stages: Stage[] = ["Discussion", "Site Visit", "Negotiation", "Token", "Registry", "Closed", "Dropped"];

function PipelinePage() {
  const { deals, contacts, updateDealStage, bumpReliability, logActivity } = useStore();
  const total = deals.filter(d => d.stage !== "Dropped" && d.stage !== "Closed").reduce((s, d) => s + d.value, 0);

  return (
    <AppShell title="Deal pipeline" subtitle={`${formatINR(total)} active across ${deals.length} deals`}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
        {stages.map(stage => {
          const items = deals.filter(d => d.stage === stage);
          const stageColor =
            stage === "Closed" ? "bg-success/15 text-success" :
            stage === "Dropped" ? "bg-destructive/15 text-destructive" :
            stage === "Registry" ? "bg-success/10 text-success" :
            stage === "Token" ? "gradient-gold text-primary" :
            stage === "Negotiation" ? "bg-fire/15 text-fire" :
            "bg-muted text-foreground";

          return (
            <Card key={stage} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={"px-2.5 py-1 rounded-md text-xs font-semibold " + stageColor}>{stage}</span>
                  <span className="text-xs text-muted-foreground">{items.length}</span>
                </div>
                <span className="text-xs text-muted-foreground">{formatINR(items.reduce((s, d) => s + d.value, 0))}</span>
              </div>

              <div className="space-y-3">
                {items.map(d => {
                  const buyer = contacts.find(c => c.id === d.buyerId);
                  const seller = contacts.find(c => c.id === d.sellerId);
                  return (
                    <div key={d.id} className="rounded-lg border border-border p-3 bg-background">
                      <div className="text-sm font-medium leading-tight">{d.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {d.type} · {d.subtype} · {formatINR(d.value)}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-[10px]">{buyer?.name}</Badge>
                        <Badge variant="outline" className="text-[10px]">{seller?.name}</Badge>
                      </div>
                      <div className="mt-3 flex gap-1.5 flex-wrap">
                        {stage !== "Closed" && stage !== "Dropped" && (
                          <>
                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => {
                              const next = stages[Math.min(stages.indexOf(stage) + 1, 5)];
                              updateDealStage(d.id, next);
                              if (next === "Site Visit") { bumpReliability(d.buyerId, 2); logActivity(d.buyerId, "Site visit scheduled"); }
                              if (next === "Closed") { bumpReliability(d.sellerId, 5); bumpReliability(d.buyerId, 5); }
                              toast.success(`Moved to ${next}`);
                            }}>
                              <Check className="size-3" /> Advance
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => {
                              logActivity(d.buyerId, "Called buyer");
                              toast("Activity logged");
                            }}>
                              <Phone className="size-3" /> Log call
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive" onClick={() => {
                              updateDealStage(d.id, "Dropped");
                              toast("Deal dropped");
                            }}>
                              <X className="size-3" /> Drop
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
                {items.length === 0 && <div className="text-xs text-muted-foreground py-4 text-center">Empty</div>}
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
