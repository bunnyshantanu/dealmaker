import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, B as Badge } from "./badge-Dm_2tmd4.js";
import { C as Card } from "./card-BbF6o9Kw.js";
import { B as Button } from "./button-Cz8PAkJh.js";
import { u as useStore } from "./useStore-BhTJHexu.js";
import { useState } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet, Upload } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "./router-CxU_Q1IW.js";
import "zustand";
import "zustand/middleware";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
const pickField = (row, keys) => {
  for (const k of Object.keys(row)) {
    if (keys.some((key) => k.toLowerCase().includes(key))) {
      const v = row[k];
      if (v !== null && v !== void 0 && String(v).trim()) return String(v).trim();
    }
  }
  return "";
};
const guessRole = (s) => {
  const v = s.toLowerCase();
  if (v.includes("broker") || v.includes("agent")) return "broker";
  if (v.includes("sell") || v.includes("owner")) return "seller";
  return "buyer";
};
function ImportPage() {
  const {
    addContact
  } = useStore();
  const [rows, setRows] = useState([]);
  const [filename, setFilename] = useState();
  const handleFile = (file) => {
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result);
      const wb = XLSX.read(data, {
        type: "array"
      });
      const all = [];
      wb.SheetNames.forEach((sheet) => {
        const json = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        json.forEach((r) => {
          const name = pickField(r, ["name", "client", "contact"]);
          const phone = pickField(r, ["phone", "mobile", "number", "contact"]);
          if (!name && !phone) return;
          all.push({
            name: name || "Unknown",
            phone: phone || "—",
            email: pickField(r, ["email", "mail"]),
            role: guessRole(pickField(r, ["role", "type", "category"]) || sheet),
            notes: pickField(r, ["note", "remark", "comment"])
          });
        });
      });
      setRows(all);
      toast.success(`Parsed ${all.length} rows from ${wb.SheetNames.length} sheet(s)`);
    };
    reader.readAsArrayBuffer(file);
  };
  const importAll = () => {
    rows.forEach((r) => addContact({
      name: r.name,
      phone: r.phone,
      email: r.email,
      role: r.role,
      source: "Internal",
      reliability: 60,
      tags: [],
      verified: true
    }));
    toast.success(`Imported ${rows.length} contacts`);
    setRows([]);
    setFilename(void 0);
  };
  return /* @__PURE__ */ jsxs(AppShell, { title: "Import from Excel", subtitle: "Bring in your existing buyers, sellers, and brokers in seconds.", children: [
    /* @__PURE__ */ jsxs(Card, { className: "p-8", children: [
      /* @__PURE__ */ jsxs("label", { className: "block border-2 border-dashed border-border hover:border-foreground/40 rounded-xl p-10 text-center cursor-pointer transition-colors", children: [
        /* @__PURE__ */ jsx("input", { type: "file", accept: ".xlsx,.xls,.csv", className: "hidden", onChange: (e) => e.target.files?.[0] && handleFile(e.target.files[0]) }),
        /* @__PURE__ */ jsx(FileSpreadsheet, { className: "size-10 mx-auto text-muted-foreground" }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 font-medium", children: "Drop or choose an .xlsx / .csv file" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "We'll auto-detect name, phone, email, and role columns across all sheets." })
      ] }),
      filename && /* @__PURE__ */ jsxs("div", { className: "mt-4 text-xs text-muted-foreground", children: [
        "Loaded: ",
        filename
      ] })
    ] }),
    rows.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "mt-6 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "font-display text-lg", children: [
            "Preview · ",
            rows.length,
            " rows"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Review before importing" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: importAll, className: "gradient-gold text-primary", children: [
          /* @__PURE__ */ jsx(Upload, { className: "size-4" }),
          " Import all"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 px-5 py-2 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-4", children: "Name" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: "Phone" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: "Email" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "Role" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-h-96 overflow-y-auto", children: [
        rows.slice(0, 200).map((r, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 px-5 py-2.5 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ jsx("div", { className: "col-span-4 truncate", children: r.name }),
          /* @__PURE__ */ jsx("div", { className: "col-span-3 truncate text-muted-foreground", children: r.phone }),
          /* @__PURE__ */ jsx("div", { className: "col-span-3 truncate text-muted-foreground", children: r.email || "—" }),
          /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-[10px] capitalize", children: r.role }) })
        ] }, i)),
        rows.length > 200 && /* @__PURE__ */ jsxs("div", { className: "px-5 py-3 text-xs text-muted-foreground", children: [
          "Showing first 200 of ",
          rows.length,
          "."
        ] })
      ] })
    ] })
  ] });
}
export {
  ImportPage as component
};
