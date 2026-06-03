import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { useStore } from "@/store/useStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Send, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/broadcast")({ component: BroadcastPage });

function BroadcastPage() {
  const { contacts, logActivity } = useStore();
  const [msg, setMsg] = useState("Good morning team — sharing 3 new GK requirements today. Reply if you have inventory.");
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "Any",
    budgetMin: 0,
    budgetMax: 0,
    sizeMin: 0,
    sizeMax: 0,
    minUrgency: 1,
    requirementType: "Any",
  });

  const inactive = contacts.filter(c => Date.now() - new Date(c.lastActive).getTime() > 7 * 86400000);
  const top = [...contacts].filter(c => c.role === "broker").sort((a, b) => b.reliability - a.reliability).slice(0, 5);

  const send = (group: typeof contacts, label: string) => {
    group.forEach(c => logActivity(c.id, `Broadcast: ${label}`));
    toast.success(`Sent to ${group.length} ${label}`);
  };

  return (
    <AppShell title="Broadcast" subtitle="Daily ping, inactive nudges, top-broker outreach.">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-6">
            <h2 className="font-display text-xl mb-4">Compose message</h2>
            <Textarea rows={6} value={msg} onChange={e => setMsg(e.target.value)} />
            <div className="mt-4 text-xs text-muted-foreground">Mock-only: messages are logged to each contact's activity.</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="size-4" />
              <h2 className="font-display text-lg">Advanced filters</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Location</Label>
                <Input value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} placeholder="e.g. Greater Kailash" />
              </div>
              <div>
                <Label>Property type</Label>
                <Select value={filters.propertyType} onValueChange={(v) => setFilters({ ...filters, propertyType: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Any", "Apartment", "Builder Floor", "Villa", "Plot", "Commercial", "Office"].map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Budget min (₹)</Label>
                <Input type="number" value={filters.budgetMin || ""} onChange={(e) => setFilters({ ...filters, budgetMin: +e.target.value })} />
              </div>
              <div>
                <Label>Budget max (₹)</Label>
                <Input type="number" value={filters.budgetMax || ""} onChange={(e) => setFilters({ ...filters, budgetMax: +e.target.value })} />
              </div>
              <div>
                <Label>Size min (sq yards)</Label>
                <Input type="number" value={filters.sizeMin || ""} onChange={(e) => setFilters({ ...filters, sizeMin: +e.target.value })} />
              </div>
              <div>
                <Label>Size max (sq yards)</Label>
                <Input type="number" value={filters.sizeMax || ""} onChange={(e) => setFilters({ ...filters, sizeMax: +e.target.value })} />
              </div>
              <div>
                <Label>Requirement type</Label>
                <Select value={filters.requirementType} onValueChange={(v) => setFilters({ ...filters, requirementType: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Any", "Resale", "New", "Booking", "Collaboration"].map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="flex items-center justify-between">
                  <span>Min urgency</span>
                  <span className="text-foreground font-semibold">{filters.minUrgency}/10</span>
                </Label>
                <Slider value={[filters.minUrgency]} min={1} max={10} step={1} onValueChange={(v) => setFilters({ ...filters, minUrgency: v[0] })} className="mt-3" />
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="p-5">
            <Tabs defaultValue="all">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All ({contacts.length})</TabsTrigger>
                <TabsTrigger value="inactive" className="flex-1">Inactive ({inactive.length})</TabsTrigger>
                <TabsTrigger value="top" className="flex-1">Top ({top.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90" onClick={() => send(contacts, "all contacts")}>
                  <Send className="size-4" /> Send daily broadcast
                </Button>
              </TabsContent>
              <TabsContent value="inactive" className="mt-4">
                <Button className="w-full" variant="outline" onClick={() => send(inactive, "inactive users")}>
                  <Send className="size-4" /> Bulk ping inactive
                </Button>
              </TabsContent>
              <TabsContent value="top" className="mt-4">
                <div className="space-y-2 mb-3">
                  {top.map(c => <Badge key={c.id} variant="secondary" className="mr-1">{c.name}</Badge>)}
                </div>
                <Button className="w-full" variant="outline" onClick={() => send(top, "top brokers")}>
                  <Send className="size-4" /> Personal outreach
                </Button>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
