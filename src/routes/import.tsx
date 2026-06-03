import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet, Upload } from "lucide-react";
import { toast } from "sonner";
import type { Role } from "@/lib/types";

export const Route = createFileRoute("/import")({ component: ImportPage });

interface PreviewRow {
  name: string;
  phone: string;
  email?: string;
  role: Role;
  notes?: string;
}

const pickField = (row: Record<string, unknown>, keys: string[]): string => {
  for (const k of Object.keys(row)) {
    if (keys.some(key => k.toLowerCase().includes(key))) {
      const v = row[k];
      if (v !== null && v !== undefined && String(v).trim()) return String(v).trim();
    }
  }
  return "";
};

const guessRole = (s: string): Role => {
  const v = s.toLowerCase();
  if (v.includes("broker") || v.includes("agent")) return "broker";
  if (v.includes("sell") || v.includes("owner")) return "seller";
  return "buyer";
};

function ImportPage() {
  const { addContact } = useStore();
  const [rows, setRows] = useState<PreviewRow[]>([]);
  const [filename, setFilename] = useState<string>();

  const handleFile = (file: File) => {
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const wb = XLSX.read(data, { type: "array" });
      const all: PreviewRow[] = [];
      wb.SheetNames.forEach(sheet => {
        const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(wb.Sheets[sheet]);
        json.forEach(r => {
          const name = pickField(r, ["name", "client", "contact"]);
          const phone = pickField(r, ["phone", "mobile", "number", "contact"]);
          if (!name && !phone) return;
          all.push({
            name: name || "Unknown",
            phone: phone || "—",
            email: pickField(r, ["email", "mail"]),
            role: guessRole(pickField(r, ["role", "type", "category"]) || sheet),
            notes: pickField(r, ["note", "remark", "comment"]),
          });
        });
      });
      setRows(all);
      toast.success(`Parsed ${all.length} rows from ${wb.SheetNames.length} sheet(s)`);
    };
    reader.readAsArrayBuffer(file);
  };

  const importAll = () => {
    rows.forEach(r => addContact({
      name: r.name, phone: r.phone, email: r.email, role: r.role,
      source: "Internal", reliability: 60, tags: [], verified: true,
    }));
    toast.success(`Imported ${rows.length} contacts`);
    setRows([]);
    setFilename(undefined);
  };

  return (
    <AppShell title="Import from Excel" subtitle="Bring in your existing buyers, sellers, and brokers in seconds.">
      <Card className="p-8">
        <label className="block border-2 border-dashed border-border hover:border-foreground/40 rounded-xl p-10 text-center cursor-pointer transition-colors">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <FileSpreadsheet className="size-10 mx-auto text-muted-foreground" />
          <div className="mt-3 font-medium">Drop or choose an .xlsx / .csv file</div>
          <div className="text-xs text-muted-foreground mt-1">We'll auto-detect name, phone, email, and role columns across all sheets.</div>
        </label>
        {filename && <div className="mt-4 text-xs text-muted-foreground">Loaded: {filename}</div>}
      </Card>

      {rows.length > 0 && (
        <Card className="mt-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <div className="font-display text-lg">Preview · {rows.length} rows</div>
              <div className="text-xs text-muted-foreground">Review before importing</div>
            </div>
            <Button onClick={importAll} className="gradient-gold text-primary"><Upload className="size-4" /> Import all</Button>
          </div>
          <div className="grid grid-cols-12 px-5 py-2 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/40">
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Phone</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Role</div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {rows.slice(0, 200).map((r, i) => (
              <div key={i} className="grid grid-cols-12 px-5 py-2.5 text-sm border-b border-border last:border-0">
                <div className="col-span-4 truncate">{r.name}</div>
                <div className="col-span-3 truncate text-muted-foreground">{r.phone}</div>
                <div className="col-span-3 truncate text-muted-foreground">{r.email || "—"}</div>
                <div className="col-span-2"><Badge variant="secondary" className="text-[10px] capitalize">{r.role}</Badge></div>
              </div>
            ))}
            {rows.length > 200 && <div className="px-5 py-3 text-xs text-muted-foreground">Showing first 200 of {rows.length}.</div>}
          </div>
        </Card>
      )}
    </AppShell>
  );
}
