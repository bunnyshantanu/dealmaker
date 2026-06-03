import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { useStore } from "@/store/useStore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/new-users")({ component: NewUsersPage });

function NewUsersPage() {
  const { contacts } = useStore();
  const newUsers = contacts
    .filter(c => Date.now() - new Date(c.createdAt).getTime() < 14 * 86400000)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return (
    <AppShell title="New users joined" subtitle="Free leads — your network is growing.">
      {newUsers.length === 0 && <Card className="p-10 text-center text-sm text-muted-foreground">No new users in the last 14 days.</Card>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newUsers.map(c => {
          const ref = contacts.find(x => x.id === c.referredBy);
          return (
            <Card key={c.id} className="p-5">
              <div className="flex items-start justify-between mb-2">
                <Badge className="bg-gold/20 text-foreground border-0"><Sparkles className="size-3 mr-1" /> {c.source}</Badge>
                <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(c.createdAt))} ago</span>
              </div>
              <div className="text-lg font-display">{c.name}</div>
              <div className="text-sm text-muted-foreground capitalize">{c.role}</div>
              <div className="text-sm mt-3">{c.phone}</div>
              {ref && <div className="text-xs text-muted-foreground mt-1">Referred by <span className="font-medium text-foreground">{ref.name}</span></div>}
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" asChild>
                  <a href={`tel:${c.phone.replace(/\s+/g, "")}`}><Phone className="size-3.5" /> Call</a>
                </Button>
                {!c.verified && <Badge variant="outline">Unverified</Badge>}
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
