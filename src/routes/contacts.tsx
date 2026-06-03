import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { useStore } from "@/store/useStore";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Plus, Search, Ban, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Role } from "@/lib/types";
import { toast } from "sonner";

export const Route = createFileRoute("/contacts")({ component: ContactsPage });

function ContactsPage() {
  const { contacts, addContact, toggleBlacklist, rateContact } = useStore();
  const [q, setQ] = useState("");
  const [role, setRole] = useState<Role | "all">("all");
  const [showBlacklisted, setShowBlacklisted] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", role: "buyer" as Role });

  const filtered = contacts.filter(c =>
    (role === "all" || c.role === role) &&
    (showBlacklisted ? c.blacklisted : !c.blacklisted) &&
    (c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q)),
  );

  const submit = () => {
    if (!form.name || !form.phone) return;
    addContact({ ...form, source: "Internal", reliability: 60, tags: [], verified: true });
    setForm({ name: "", phone: "", email: "", role: "buyer" });
    setOpen(false);
  };

  return (
    <AppShell title="Contacts" subtitle="Brokers, buyers, sellers — all in one place. Rate, review, or blacklist as needed."
      action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-gold text-primary"><Plus className="size-4" /> Add contact</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New contact</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              <div><Label>Email (optional)</Label><Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div>
                <Label>Role</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as Role })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="broker">Broker</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter><Button onClick={submit}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-64">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or phone" className="pl-9" />
        </div>
        <Select value={role} onValueChange={(v) => setRole(v as Role | "all")}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="broker">Brokers</SelectItem>
            <SelectItem value="buyer">Buyers</SelectItem>
            <SelectItem value="seller">Sellers</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant={showBlacklisted ? "default" : "outline"}
          onClick={() => setShowBlacklisted((v) => !v)}
          className={showBlacklisted ? "" : "text-destructive border-destructive/40 hover:bg-destructive/5"}
        >
          <Ban className="size-4" /> {showBlacklisted ? "Hide blacklisted" : "Show blacklisted"}
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/40">
          <div className="col-span-3">Name</div>
          <div className="col-span-1">Role</div>
          <div className="col-span-2">Reliability</div>
          <div className="col-span-2">Rating</div>
          <div className="col-span-2">Last active</div>
          <div className="col-span-2 text-right pr-2">Actions</div>
        </div>
        {filtered.map(c => (
          <div key={c.id} className={"grid grid-cols-12 px-5 py-4 items-center border-b border-border last:border-0 hover:bg-muted/30 transition-colors " + (c.blacklisted ? "opacity-60" : "")}>
            <div className="col-span-3 min-w-0">
              <div className="font-medium truncate flex items-center gap-2">
                {c.name}
                {c.blacklisted && <Badge variant="destructive" className="text-[9px]">Blacklisted</Badge>}
              </div>
              <div className="text-xs text-muted-foreground">{c.phone}</div>
            </div>
            <div className="col-span-1 capitalize text-sm">{c.role}</div>
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                  <div className={"h-full " + (c.reliability >= 80 ? "bg-success" : c.reliability >= 60 ? "bg-gold" : "bg-fire")} style={{ width: `${c.reliability}%` }} />
                </div>
                <span className="text-xs text-muted-foreground">{c.reliability}</span>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => { rateContact(c.id, n); toast.success(`Rated ${c.name.split(" ")[0]} ${n}/5`); }}
                    aria-label={`Rate ${n} stars`}
                  >
                    <Star className={"size-3.5 " + (n <= Math.round(c.rating ?? 0) ? "fill-gold text-gold" : "text-muted-foreground hover:text-foreground")} />
                  </button>
                ))}
                {c.reviewsCount ? <span className="text-[10px] text-muted-foreground ml-1">({c.reviewsCount})</span> : null}
              </div>
            </div>
            <div className="col-span-2 text-xs text-muted-foreground">{formatDistanceToNow(new Date(c.lastActive))} ago</div>
            <div className="col-span-2 flex justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  toggleBlacklist(c.id, c.blacklisted ? undefined : "Manual blacklist");
                  toast(c.blacklisted ? `${c.name.split(" ")[0]} restored` : `${c.name.split(" ")[0]} blacklisted`);
                }}
                className={c.blacklisted ? "text-success hover:text-success" : "text-destructive hover:text-destructive"}
              >
                <Ban className="size-3.5" /> {c.blacklisted ? "Unblacklist" : "Blacklist"}
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="p-10 text-center text-sm text-muted-foreground">No contacts match.</div>}
      </Card>
    </AppShell>
  );
}
