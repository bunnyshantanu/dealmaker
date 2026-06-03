import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Users, Building2, Sparkles, ListChecks, UserPlus, Megaphone, FileSpreadsheet, Link2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/useAuth";

const brokerItems = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/contacts", label: "Contacts", icon: Users },
  { to: "/inventory", label: "Inventory", icon: Building2 },
  { to: "/matches", label: "Matches", icon: Sparkles },
  { to: "/pipeline", label: "Pipeline", icon: ListChecks },
  { to: "/new-users", label: "New Users", icon: UserPlus },
  { to: "/broadcast", label: "Broadcast", icon: Megaphone },
  { to: "/import", label: "Import Excel", icon: FileSpreadsheet },
] as const;

const clientItems = [
  { to: "/app", label: "Home", icon: LayoutDashboard },
  { to: "/matches", label: "My matches", icon: Sparkles },
  { to: "/inventory", label: "My listings", icon: Building2 },
  { to: "/pipeline", label: "My deals", icon: ListChecks },
  { to: "/become", label: "Become a Buyer/seller", icon: UserPlus },
] as const;

export function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const items = user?.role === "broker" ? brokerItems : clientItems;
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gradient-ink text-sidebar-foreground">
      <div className="px-6 pt-7 pb-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-lg gradient-gold grid place-items-center">
            <Link2 className="size-5 text-primary -rotate-45" />
          </div>
          <div>
            <div className="font-display text-lg leading-none">DealChain</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-sidebar-foreground/60">
              {user?.role === "broker" ? "Broker workspace" : "Deal floor"}
            </div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <it.icon className="size-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-sidebar-border space-y-3">
        {user && (
          <div className="flex items-center gap-2.5 px-2">
            <div className="size-8 rounded-full gradient-gold grid place-items-center text-[11px] font-semibold text-primary">
              {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-medium truncate text-sidebar-foreground">{user.name}</div>
              <div className="text-[10px] capitalize text-sidebar-foreground/60">{user.role}</div>
            </div>
          </div>
        )}
        <button
          onClick={() => { logout(); navigate({ to: "/login" }); }}
          className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="size-3.5" /> Sign out
        </button>
      </div>
    </aside>
  );
}
