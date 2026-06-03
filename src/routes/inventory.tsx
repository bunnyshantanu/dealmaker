import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { useStore } from "@/store/useStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, RotateCcw, X, Flame } from "lucide-react";
import { useState } from "react";
import { formatINR, formatYards } from "@/lib/match";
import type { DealType, FilledBy, PropertyType } from "@/lib/types";
import { toast } from "sonner";

export const Route = createFileRoute("/inventory")({ component: InventoryPage });

const PT: PropertyType[] = ["Apartment", "Builder Floor", "Villa", "Plot", "Commercial", "Office"];
const DT: DealType[] = ["Resale", "New", "Booking", "Collaboration"];

const urgencyLabel = (kind: "requirement" | "inventory", filledBy: FilledBy) => {
  if (kind === "requirement") {
    return filledBy === "self"
      ? "On a scale 1–10, how urgent is your requirement?"
      : "On a scale 1–10, how serious do you think your buyer is?";
  }
  return filledBy === "self"
    ? "On a scale 1–10, how urgent is it for you to sell?"
    : "On a scale 1–10, how fast does your seller want to sell?";
};

function InventoryPage() {
  const { listings, contacts, addListing, softDeleteListing, restoreListing, purgeListing } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    ownerId: contacts[0]?.id || "",
    kind: "inventory" as "inventory" | "requirement",
    propertyType: "Apartment" as PropertyType,
    dealType: "Resale" as DealType,
    filledBy: "self" as FilledBy,
    filledByBrokerId: "",
    urgency: 5,
    location: "",
    budgetMin: 0, budgetMax: 0,
    sizeMin: 0, sizeMax: 0,
    collabFloorsOffered: 0,
    collabCashDelta: 0,
    notes: "",
  });

  const submit = () => {
    if (!form.location || !form.ownerId) return;
    addListing({
      ownerId: form.ownerId,
      kind: form.kind,
      propertyType: form.propertyType,
      dealType: form.dealType,
      filledBy: form.filledBy,
      filledByBrokerId: form.filledBy === "broker" ? form.filledByBrokerId || undefined : undefined,
      urgency: form.urgency,
      location: form.location,
      budgetMin: form.budgetMin,
      budgetMax: form.budgetMax,
      sizeMin: form.sizeMin,
      sizeMax: form.sizeMax,
      notes: form.notes,
      ...(form.dealType === "Collaboration" ? {
        collabFloorsOffered: form.collabFloorsOffered,
        collabCashDelta: form.collabCashDelta,
      } : {}),
    });
    setOpen(false);
    toast.success("Listing added");
  };

  const dealTypeTone = (dt?: DealType) =>
    dt === "Collaboration" ? "bg-fire/15 text-fire border-fire/30" :
    dt === "Booking" ? "bg-warning/15 text-foreground border-warning/40" :
    dt === "New" ? "bg-success/15 text-success border-success/30" :
    "bg-muted text-foreground";

  const urgencyTone = (u?: number) =>
    !u ? "text-muted-foreground" :
    u >= 8 ? "text-fire" :
    u >= 5 ? "text-foreground" :
    "text-muted-foreground";

  const renderList = (kind: "requirement" | "inventory") => {
    const items = listings.filter(l => l.kind === kind && !l.deletedAt);
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(l => {
          const owner = contacts.find(c => c.id === l.ownerId);
          const broker = l.filledByBrokerId ? contacts.find(c => c.id === l.filledByBrokerId) : null;
          return (
            <Card key={l.id} className="p-5 relative group">
              <button
                onClick={() => { softDeleteListing(l.id); toast("Moved to trash", { action: { label: "Undo", onClick: () => restoreListing(l.id) } }); }}
                className="absolute top-3 right-3 size-7 grid place-items-center rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
                aria-label="Cancel entry"
                title="Cancel entry (move to trash)"
              >
                <X className="size-4" />
              </button>
              <div className="flex items-start justify-between pr-8">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{l.propertyType}</div>
                  <div className="text-lg font-display mt-1">{l.location}</div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  {l.dealType && <Badge variant="outline" className={dealTypeTone(l.dealType)}>{l.dealType}</Badge>}
                  {typeof l.urgency === "number" && (
                    <span className={"text-[11px] inline-flex items-center gap-1 " + urgencyTone(l.urgency)}>
                      {l.urgency >= 8 && <Flame className="size-3" />}
                      Urgency {l.urgency}/10
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Budget</div>
                  <div>{l.budgetMin || l.budgetMax ? `${formatINR(l.budgetMin)} – ${formatINR(l.budgetMax)}` : "—"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Size</div>
                  <div>{formatYards(l.sizeMin, l.sizeMax)}</div>
                </div>
                {l.dealType === "Collaboration" && (
                  <>
                    <div>
                      <div className="text-xs text-muted-foreground">Floors offered</div>
                      <div>{l.collabFloorsOffered ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Cash delta</div>
                      <div>{l.collabCashDelta ? formatINR(l.collabCashDelta) : "—"}</div>
                    </div>
                  </>
                )}
              </div>
              {l.notes && <p className="text-xs text-muted-foreground mt-3">{l.notes}</p>}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Owner</span>
                <span className="font-medium">{owner?.name}{broker ? ` · via ${broker.name}` : ""}</span>
              </div>
            </Card>
          );
        })}
        {items.length === 0 && <Card className="p-10 text-center text-sm text-muted-foreground md:col-span-2">No {kind}s yet.</Card>}
      </div>
    );
  };

  const trashed = listings.filter(l => l.deletedAt);

  return (
    <AppShell title="Inventory & Requirements" subtitle="What sellers have, what buyers want."
      action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gradient-gold text-primary"><Plus className="size-4" /> Add listing</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>New listing</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Type</Label>
                <Select value={form.kind} onValueChange={(v) => setForm({ ...form, kind: v as "inventory" | "requirement" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inventory">Inventory (selling)</SelectItem>
                    <SelectItem value="requirement">Requirement (buying)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Deal type</Label>
                <Select value={form.dealType} onValueChange={(v) => setForm({ ...form, dealType: v as DealType })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{DT.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Filled by</Label>
                <Select value={form.filledBy} onValueChange={(v) => setForm({ ...form, filledBy: v as FilledBy })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">{form.kind === "requirement" ? "Buyer (self)" : "Seller (self)"}</SelectItem>
                    <SelectItem value="broker">Broker (on behalf)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Owner ({form.kind === "requirement" ? "buyer" : "seller"})</Label>
                <Select value={form.ownerId} onValueChange={(v) => setForm({ ...form, ownerId: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{contacts.map(c => <SelectItem key={c.id} value={c.id}>{c.name} ({c.role})</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {form.filledBy === "broker" && (
                <div className="col-span-2">
                  <Label>Broker filling this form</Label>
                  <Select value={form.filledByBrokerId} onValueChange={(v) => setForm({ ...form, filledByBrokerId: v })}>
                    <SelectTrigger><SelectValue placeholder="Select broker" /></SelectTrigger>
                    <SelectContent>{contacts.filter(c => c.role === "broker").map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label>Property type</Label>
                <Select value={form.propertyType} onValueChange={(v) => setForm({ ...form, propertyType: v as PropertyType })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{PT.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Greater Kailash" /></div>
              <div><Label>Budget min (₹)</Label><Input type="number" value={form.budgetMin || ""} onChange={e => setForm({ ...form, budgetMin: +e.target.value })} /></div>
              <div><Label>Budget max (₹)</Label><Input type="number" value={form.budgetMax || ""} onChange={e => setForm({ ...form, budgetMax: +e.target.value })} /></div>
              <div>
                <Label>Size min (sq yards)</Label>
                <Input type="number" value={form.sizeMin ? Math.round(form.sizeMin / 9) : ""} onChange={e => setForm({ ...form, sizeMin: +e.target.value * 9 })} placeholder="e.g. 300" />
              </div>
              <div>
                <Label>Size max (sq yards)</Label>
                <Input type="number" value={form.sizeMax ? Math.round(form.sizeMax / 9) : ""} onChange={e => setForm({ ...form, sizeMax: +e.target.value * 9 })} placeholder="e.g. 400" />
              </div>

              {form.dealType === "Collaboration" && (
                <>
                  <div>
                    <Label>Floors offered / wanted</Label>
                    <Input type="number" value={form.collabFloorsOffered || ""} onChange={e => setForm({ ...form, collabFloorsOffered: +e.target.value })} />
                  </div>
                  <div>
                    <Label>Cash difference (₹, +/-)</Label>
                    <Input type="number" value={form.collabCashDelta || ""} onChange={e => setForm({ ...form, collabCashDelta: +e.target.value })} />
                  </div>
                </>
              )}

              <div className="col-span-2 mt-1">
                <Label className="flex items-center justify-between">
                  <span>{urgencyLabel(form.kind, form.filledBy)}</span>
                  <span className="text-foreground font-semibold">{form.urgency}/10</span>
                </Label>
                <Slider value={[form.urgency]} min={1} max={10} step={1} onValueChange={(v) => setForm({ ...form, urgency: v[0] })} className="mt-3" />
              </div>

              <div className="col-span-2"><Label>Notes</Label><Input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
            </div>
            <DialogFooter><Button onClick={submit}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <Tabs defaultValue="inventory">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="requirement">Requirements</TabsTrigger>
          <TabsTrigger value="trash"><Trash2 className="size-3.5 mr-1" /> Trash {trashed.length > 0 && `(${trashed.length})`}</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="mt-5">{renderList("inventory")}</TabsContent>
        <TabsContent value="requirement" className="mt-5">{renderList("requirement")}</TabsContent>
        <TabsContent value="trash" className="mt-5">
          {trashed.length === 0 ? (
            <Card className="p-10 text-center text-sm text-muted-foreground">Trash is empty.</Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {trashed.map(l => (
                <Card key={l.id} className="p-5 opacity-70">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">{l.propertyType} · {l.kind}</div>
                      <div className="text-lg font-display mt-1 line-through">{l.location}</div>
                      <div className="text-xs text-muted-foreground mt-1">{l.dealType} · {formatINR(l.budgetMin)}–{formatINR(l.budgetMax)}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" onClick={() => { restoreListing(l.id); toast.success("Restored"); }}>
                        <RotateCcw className="size-3.5" /> Restore
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { purgeListing(l.id); toast("Deleted permanently"); }}>
                        <Trash2 className="size-3.5" /> Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
