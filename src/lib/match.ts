import type { DealType, Listing, Match } from "./types";

// ---------- Display helpers (Phase 1/3) ----------
// Buyer budget = max they'll pay. Seller ask = min they'll accept.
export const buyerBudget = (l: Listing) => l.budgetMax || l.budgetMin;
export const sellerAsk = (l: Listing) => l.budgetMin || l.budgetMax;

// Convert sqft → sq yards (1 sq yd = 9 sq ft)
export const toYards = (sqft: number) => Math.round(sqft / 9);
export const formatYards = (sqftMin: number, sqftMax: number) => {
  const a = toYards(sqftMin);
  const b = toYards(sqftMax);
  if (!a && !b) return "—";
  if (a === b) return `${a} sq yd`;
  return `${a}–${b} sq yd`;
};

// Exact match % between buyer requirement and seller inventory
// Formula: priceMatch (0-100) - typePenalty - locationPenalty - sizePenalty
export function exactMatchPct(buyer: Listing, seller: Listing): number {
  const budget = buyerBudget(buyer);
  const ask = sellerAsk(seller);
  if (!budget || !ask) return 0;
  const delta = Math.abs(ask - budget) / Math.max(budget, ask);
  let pct = Math.max(0, 100 - delta * 100);

  if (buyer.propertyType !== seller.propertyType) pct -= 15;

  const sameLoc = buyer.location.toLowerCase() === seller.location.toLowerCase();
  const fuzzyLoc =
    buyer.location.toLowerCase().includes(seller.location.toLowerCase()) ||
    seller.location.toLowerCase().includes(buyer.location.toLowerCase());
  if (!sameLoc && !fuzzyLoc) pct -= 25;
  else if (!sameLoc) pct -= 8;

  // soft size penalty
  if (buyer.sizeMax && seller.sizeMin) {
    const sizeMid = (seller.sizeMin + seller.sizeMax) / 2;
    const buyerMid = (buyer.sizeMin + buyer.sizeMax) / 2;
    if (buyerMid > 0) {
      const sDelta = Math.abs(sizeMid - buyerMid) / buyerMid;
      if (sDelta > 0.3) pct -= 5;
    }
  }
  return Math.max(0, Math.min(100, Math.round(pct)));
}

const overlap = (aMin: number, aMax: number, bMin: number, bMax: number) => {
  const lo = Math.max(aMin, bMin);
  const hi = Math.min(aMax, bMax);
  return hi >= lo ? (hi - lo) / Math.max(1, Math.max(aMax, bMax) - Math.min(aMin, bMin)) : -1;
};

// Resale ↔ Resale, New ↔ New, Booking ↔ Booking, Collaboration ↔ Collaboration.
// Resale and New are loosely compatible (someone selling new construction can satisfy a New buyer).
const dealTypeCompatible = (a?: DealType, b?: DealType) => {
  if (!a || !b) return true; // legacy listings without dealType match anything
  if (a === b) return true;
  if ((a === "Resale" && b === "New") || (a === "New" && b === "Resale")) return true;
  return false;
};

export function scoreMatch(buyer: Listing, seller: Listing): { score: number; spread: number; dealType?: DealType } | null {
  if (buyer.kind !== "requirement" || seller.kind !== "inventory") return null;
  if (buyer.propertyType !== seller.propertyType) return null;
  if (!dealTypeCompatible(buyer.dealType, seller.dealType)) return null;

  const locMatch =
    buyer.location.toLowerCase() === seller.location.toLowerCase()
      ? 1
      : buyer.location.toLowerCase().includes(seller.location.toLowerCase()) ||
        seller.location.toLowerCase().includes(buyer.location.toLowerCase())
      ? 0.7
      : 0;
  if (locMatch === 0) return null;

  const budget = overlap(buyer.budgetMin, buyer.budgetMax, seller.budgetMin, seller.budgetMax);
  const size = overlap(buyer.sizeMin, buyer.sizeMax, seller.sizeMin, seller.sizeMax);
  if (budget < 0 && size < 0) return null;

  let score = 70;
  score += locMatch * 10;
  score += Math.max(0, budget) * 15;
  score += Math.max(0, size) * 10;

  // Dealtype exact match bonus
  if (buyer.dealType && seller.dealType && buyer.dealType === seller.dealType) score += 4;

  const spread = buyer.budgetMax - seller.budgetMin;
  if (spread > 0) {
    const spreadPct = spread / Math.max(1, seller.budgetMin);
    if (spreadPct > 0.08) score += 8;
    if (spreadPct > 0.15) score += 5;
  }

  const snapped =
    score >= 108 ? 110 :
    score >= 98 ? 100 :
    score >= 88 ? 90 :
    score >= 78 ? 80 : 0;

  if (snapped === 0) return null;
  const dealType = buyer.dealType && seller.dealType && buyer.dealType === seller.dealType
    ? buyer.dealType
    : seller.dealType || buyer.dealType;
  return { score: snapped, spread, dealType };
}

export function buildMatches(listings: Listing[]): Match[] {
  // Skip soft-deleted entries
  const live = listings.filter(l => !l.deletedAt);
  const buyers = live.filter(l => l.kind === "requirement");
  const sellers = live.filter(l => l.kind === "inventory");
  const result: Match[] = [];
  for (const b of buyers) {
    for (const s of sellers) {
      const r = scoreMatch(b, s);
      if (!r) continue;
      const isCollab = r.dealType === "Collaboration";
      const outcomes: Match["outcomes"] = isCollab ? ["Collaboration"] : ["Brokerage"];
      if (!isCollab && r.score >= 100 && r.spread > 0) outcomes.push("Trading");
      const minUrgency = Math.min(b.urgency ?? 5, s.urgency ?? 5);
      result.push({
        id: `${b.id}-${s.id}`,
        buyerListingId: b.id,
        sellerListingId: s.id,
        score: r.score,
        outcomes,
        spread: r.spread,
        dealType: r.dealType,
        minUrgency,
      });
    }
  }
  // Sort by score, then by urgency (urgent first)
  return result.sort((a, b) => (b.score - a.score) || ((b.minUrgency ?? 0) - (a.minUrgency ?? 0)));
}

export function scoreLabel(score: number) {
  if (score >= 100) return { label: "Perfect match", tone: "success" as const };
  if (score >= 90) return { label: "Strong match", tone: "gold" as const };
  if (score >= 80) return { label: "Trading possibility", tone: "fire" as const };
  return { label: "Possible match", tone: "muted" as const };
}

export function formatINR(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}
