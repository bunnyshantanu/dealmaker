const toYards = (sqft) => Math.round(sqft / 9);
const formatYards = (sqftMin, sqftMax) => {
  const a = toYards(sqftMin);
  const b = toYards(sqftMax);
  if (!a && !b) return "—";
  if (a === b) return `${a} sq yd`;
  return `${a}–${b} sq yd`;
};
const overlap = (aMin, aMax, bMin, bMax) => {
  const lo = Math.max(aMin, bMin);
  const hi = Math.min(aMax, bMax);
  return hi >= lo ? (hi - lo) / Math.max(1, Math.max(aMax, bMax) - Math.min(aMin, bMin)) : -1;
};
const dealTypeCompatible = (a, b) => {
  if (!a || !b) return true;
  if (a === b) return true;
  if (a === "Resale" && b === "New" || a === "New" && b === "Resale") return true;
  return false;
};
function scoreMatch(buyer, seller) {
  if (buyer.kind !== "requirement" || seller.kind !== "inventory") return null;
  if (buyer.propertyType !== seller.propertyType) return null;
  if (!dealTypeCompatible(buyer.dealType, seller.dealType)) return null;
  const locMatch = buyer.location.toLowerCase() === seller.location.toLowerCase() ? 1 : buyer.location.toLowerCase().includes(seller.location.toLowerCase()) || seller.location.toLowerCase().includes(buyer.location.toLowerCase()) ? 0.7 : 0;
  if (locMatch === 0) return null;
  const budget = overlap(buyer.budgetMin, buyer.budgetMax, seller.budgetMin, seller.budgetMax);
  const size = overlap(buyer.sizeMin, buyer.sizeMax, seller.sizeMin, seller.sizeMax);
  if (budget < 0 && size < 0) return null;
  let score = 70;
  score += locMatch * 10;
  score += Math.max(0, budget) * 15;
  score += Math.max(0, size) * 10;
  if (buyer.dealType && seller.dealType && buyer.dealType === seller.dealType) score += 4;
  const spread = buyer.budgetMax - seller.budgetMin;
  if (spread > 0) {
    const spreadPct = spread / Math.max(1, seller.budgetMin);
    if (spreadPct > 0.08) score += 8;
    if (spreadPct > 0.15) score += 5;
  }
  const snapped = score >= 108 ? 110 : score >= 98 ? 100 : score >= 88 ? 90 : score >= 78 ? 80 : 0;
  if (snapped === 0) return null;
  const dealType = buyer.dealType && seller.dealType && buyer.dealType === seller.dealType ? buyer.dealType : seller.dealType || buyer.dealType;
  return { score: snapped, spread, dealType };
}
function buildMatches(listings) {
  const live = listings.filter((l) => !l.deletedAt);
  const buyers = live.filter((l) => l.kind === "requirement");
  const sellers = live.filter((l) => l.kind === "inventory");
  const result = [];
  for (const b of buyers) {
    for (const s of sellers) {
      const r = scoreMatch(b, s);
      if (!r) continue;
      const isCollab = r.dealType === "Collaboration";
      const outcomes = isCollab ? ["Collaboration"] : ["Brokerage"];
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
        minUrgency
      });
    }
  }
  return result.sort((a, b) => b.score - a.score || (b.minUrgency ?? 0) - (a.minUrgency ?? 0));
}
function scoreLabel(score) {
  if (score >= 100) return { label: "Perfect match", tone: "success" };
  if (score >= 90) return { label: "Strong match", tone: "gold" };
  if (score >= 80) return { label: "Trading possibility", tone: "fire" };
  return { label: "Possible match", tone: "muted" };
}
function formatINR(n) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}
export {
  formatYards as a,
  buildMatches as b,
  formatINR as f,
  scoreLabel as s
};
