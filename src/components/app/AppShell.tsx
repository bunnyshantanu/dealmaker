import { Sidebar } from "./Sidebar";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

export function AppShell({ children, title, subtitle, action }: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border">
          <Link to="/app" className="font-display text-lg">DealChain</Link>
          <Menu className="size-5" />
        </header>
        <div className="px-6 md:px-10 pt-8 pb-4 border-b border-border flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-display">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{subtitle}</p>}
          </div>
          {action}
        </div>
        <main className="flex-1 px-6 md:px-10 py-8">{children}</main>
      </div>
    </div>
  );
}
