import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ActivityLog, Contact, Deal, Listing, Stage } from "@/lib/types";

const now = () => new Date().toISOString();
const daysAgo = (d: number) => new Date(Date.now() - d * 86400000).toISOString();
const id = () => Math.random().toString(36).slice(2, 10);

const seedContacts: Contact[] = [
  { id: "c1", name: "Alisha Kapoor", phone: "+91 98100 11111", role: "broker", source: "Internal", reliability: 88, tags: ["⭐ Top Broker"], lastActive: daysAgo(1), createdAt: daysAgo(120), verified: true },
  { id: "c2", name: "Rohan Mehta", phone: "+91 98100 22222", role: "buyer", source: "Internal", reliability: 76, tags: ["🔥 Serious"], lastActive: daysAgo(2), createdAt: daysAgo(60), verified: true },
  { id: "c3", name: "Priya Singh", phone: "+91 98100 33333", role: "seller", source: "Referral", referredBy: "c1", reliability: 81, tags: ["💎 Real Seller"], lastActive: daysAgo(0), createdAt: daysAgo(45), verified: true },
  { id: "c4", name: "Vikram Sethi", phone: "+91 98100 44444", role: "broker", source: "Internal", reliability: 70, tags: [], lastActive: daysAgo(7), createdAt: daysAgo(200), verified: true },
  { id: "c5", name: "Naina Arora", phone: "+91 98100 55555", role: "buyer", source: "External", reliability: 50, tags: ["🆕 New"], lastActive: daysAgo(0), createdAt: daysAgo(0), verified: false },
  { id: "c6", name: "Karan Bhatia", phone: "+91 98100 66666", role: "seller", source: "Internal", reliability: 65, tags: [], lastActive: daysAgo(14), createdAt: daysAgo(90), verified: true },
  { id: "c7", name: "Sahil Verma", phone: "+91 98100 77777", role: "broker", source: "Referral", referredBy: "c1", reliability: 55, tags: ["🆕 New"], lastActive: daysAgo(0), createdAt: daysAgo(0), verified: false },
];

const seedListings: Listing[] = [
  { id: "l1", ownerId: "c2", kind: "requirement", propertyType: "Builder Floor", location: "Greater Kailash", budgetMin: 60000000, budgetMax: 75000000, sizeMin: 2400, sizeMax: 3200, notes: "South-facing, parking 2", createdAt: daysAgo(10), dealType: "Resale", urgency: 8, filledBy: "self" },
  { id: "l2", ownerId: "c3", kind: "inventory", propertyType: "Builder Floor", location: "Greater Kailash", budgetMin: 64000000, budgetMax: 70000000, sizeMin: 2700, sizeMax: 2900, notes: "Newly built, 3rd floor", createdAt: daysAgo(8), dealType: "Resale", urgency: 7, filledBy: "self" },
  { id: "l3", ownerId: "c5", kind: "requirement", propertyType: "Apartment", location: "Defence Colony", budgetMin: 35000000, budgetMax: 42000000, sizeMin: 1800, sizeMax: 2200, createdAt: daysAgo(2), dealType: "New", urgency: 6, filledBy: "broker", filledByBrokerId: "c1" },
  { id: "l4", ownerId: "c6", kind: "inventory", propertyType: "Apartment", location: "Defence Colony", budgetMin: 38000000, budgetMax: 41000000, sizeMin: 1900, sizeMax: 2100, createdAt: daysAgo(20), dealType: "New", urgency: 5, filledBy: "self" },
  { id: "l5", ownerId: "c2", kind: "requirement", propertyType: "Villa", location: "Vasant Vihar", budgetMin: 180000000, budgetMax: 220000000, sizeMin: 6000, sizeMax: 8000, createdAt: daysAgo(5), dealType: "Resale", urgency: 4, filledBy: "self" },
  { id: "l6", ownerId: "c3", kind: "inventory", propertyType: "Villa", location: "Vasant Vihar", budgetMin: 170000000, budgetMax: 195000000, sizeMin: 6500, sizeMax: 7500, createdAt: daysAgo(3), dealType: "Resale", urgency: 9, filledBy: "self" },
  { id: "l7", ownerId: "c6", kind: "inventory", propertyType: "Apartment", location: "Saket", budgetMin: 22000000, budgetMax: 26000000, sizeMin: 1400, sizeMax: 1600, createdAt: daysAgo(15), dealType: "Booking", urgency: 7, filledBy: "self" },
  { id: "l8", ownerId: "c4", kind: "inventory", propertyType: "Builder Floor", location: "Panchsheel Park", budgetMin: 0, budgetMax: 0, sizeMin: 3200, sizeMax: 3200, notes: "Old plot — builder offering 2 floors + ₹1.5 Cr cash for collab", createdAt: daysAgo(4), dealType: "Collaboration", urgency: 9, filledBy: "broker", filledByBrokerId: "c4", collabFloorsOffered: 2, collabCashDelta: 15000000 },
  { id: "l9", ownerId: "c2", kind: "requirement", propertyType: "Builder Floor", location: "Panchsheel Park", budgetMin: 0, budgetMax: 0, sizeMin: 3000, sizeMax: 3500, notes: "Want 2 floors collaboration in Panchsheel", createdAt: daysAgo(1), dealType: "Collaboration", urgency: 8, filledBy: "self", collabFloorsOffered: 2 },
  { id: "l10", ownerId: "c5", kind: "requirement", propertyType: "Apartment", location: "Saket", budgetMin: 20000000, budgetMax: 28000000, sizeMin: 1300, sizeMax: 1700, createdAt: daysAgo(1), dealType: "Booking", urgency: 9, filledBy: "broker", filledByBrokerId: "c7" },
];

const seedDeals: Deal[] = [
  { id: "d1", title: "GK Builder Floor — Mehta × Singh", buyerId: "c2", sellerId: "c3", brokerIds: ["c1"], type: "Trading", subtype: "1 broker", stage: "Negotiation", value: 68000000, updatedAt: daysAgo(1), createdAt: daysAgo(7) },
  { id: "d2", title: "Defence Colony Apt — Arora × Bhatia", buyerId: "c5", sellerId: "c6", brokerIds: ["c1", "c4"], type: "Brokerage", subtype: "2-table", stage: "Discussion", value: 39000000, updatedAt: daysAgo(0), createdAt: daysAgo(2) },
];

const seedActivity: ActivityLog[] = [
  { id: "a1", contactId: "c1", note: "Discussed GK floor pricing", date: daysAgo(1) },
  { id: "a2", contactId: "c3", note: "Sent updated photos", date: daysAgo(0) },
];

interface State {
  contacts: Contact[];
  listings: Listing[];
  deals: Deal[];
  activity: ActivityLog[];
  addContact: (c: Omit<Contact, "id" | "createdAt" | "lastActive">) => Contact;
  updateContact: (id: string, patch: Partial<Contact>) => void;
  toggleBlacklist: (id: string, reason?: string) => void;
  rateContact: (id: string, rating: number) => void;
  addListing: (l: Omit<Listing, "id" | "createdAt">) => void;
  softDeleteListing: (id: string) => void;
  restoreListing: (id: string) => void;
  purgeListing: (id: string) => void;
  updateDealStage: (id: string, stage: Stage) => void;
  addDeal: (d: Omit<Deal, "id" | "createdAt" | "updatedAt">) => void;
  logActivity: (contactId: string, note: string) => void;
  bumpReliability: (contactId: string, delta: number) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      contacts: seedContacts,
      listings: seedListings,
      deals: seedDeals,
      activity: seedActivity,
      addContact: (c) => {
        const newC: Contact = { ...c, id: id(), createdAt: now(), lastActive: now() };
        set((s) => ({ contacts: [newC, ...s.contacts] }));
        return newC;
      },
      updateContact: (id, patch) =>
        set((s) => ({ contacts: s.contacts.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
      toggleBlacklist: (id, reason) =>
        set((s) => ({
          contacts: s.contacts.map((c) =>
            c.id === id ? { ...c, blacklisted: !c.blacklisted, blacklistReason: !c.blacklisted ? reason : undefined } : c,
          ),
        })),
      rateContact: (id, rating) =>
        set((s) => ({
          contacts: s.contacts.map((c) => {
            if (c.id !== id) return c;
            const count = (c.reviewsCount ?? 0) + 1;
            const prev = (c.rating ?? 0) * (c.reviewsCount ?? 0);
            return { ...c, rating: (prev + rating) / count, reviewsCount: count };
          }),
        })),
      addListing: (l) =>
        set((s) => ({ listings: [{ ...l, id: Math.random().toString(36).slice(2, 10), createdAt: now() }, ...s.listings] })),
      softDeleteListing: (id) =>
        set((s) => ({ listings: s.listings.map((l) => (l.id === id ? { ...l, deletedAt: now() } : l)) })),
      restoreListing: (id) =>
        set((s) => ({ listings: s.listings.map((l) => (l.id === id ? { ...l, deletedAt: undefined } : l)) })),
      purgeListing: (id) =>
        set((s) => ({ listings: s.listings.filter((l) => l.id !== id) })),
      updateDealStage: (id, stage) =>
        set((s) => ({
          deals: s.deals.map((d) => (d.id === id ? { ...d, stage, updatedAt: now() } : d)),
        })),
      addDeal: (d) =>
        set((s) => ({
          deals: [{ ...d, id: Math.random().toString(36).slice(2, 10), createdAt: now(), updatedAt: now() }, ...s.deals],
        })),
      logActivity: (contactId, note) =>
        set((s) => ({
          activity: [{ id: Math.random().toString(36).slice(2, 10), contactId, note, date: now() }, ...s.activity],
          contacts: s.contacts.map((c) => (c.id === contactId ? { ...c, lastActive: now() } : c)),
        })),
      bumpReliability: (contactId, delta) =>
        set((s) => ({
          contacts: s.contacts.map((c) =>
            c.id === contactId ? { ...c, reliability: Math.max(0, Math.min(100, c.reliability + delta)) } : c,
          ),
        })),
    }),
    { name: "onset-deal-engine-v2" },
  ),
);
