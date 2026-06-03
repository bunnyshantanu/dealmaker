export type Role = "broker" | "buyer" | "seller";
export type PropertyType = "Apartment" | "Builder Floor" | "Villa" | "Plot" | "Commercial" | "Office";
export type Stage = "Discussion" | "Site Visit" | "Negotiation" | "Token" | "Registry" | "Closed" | "Dropped";
export type DealType = "Resale" | "New" | "Booking" | "Collaboration";
export type FilledBy = "self" | "broker";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: Role;
  source: "Internal" | "External" | "Referral";
  referredBy?: string;
  reliability: number;
  tags: string[];
  lastActive: string;
  createdAt: string;
  verified: boolean;
  blacklisted?: boolean;
  blacklistReason?: string;
  rating?: number;       // 1-5 average rating
  reviewsCount?: number; // number of reviews
}

export interface Listing {
  id: string;
  ownerId: string;
  kind: "requirement" | "inventory";
  propertyType: PropertyType;
  location: string;
  micromarket?: string;
  budgetMin: number;
  budgetMax: number;
  sizeMin: number;
  sizeMax: number;
  notes?: string;
  createdAt: string;
  // New fields
  dealType?: DealType;          // Resale / New / Booking / Collaboration
  urgency?: number;             // 1-10 seriousness/urgency
  filledBy?: FilledBy;          // who filled the form
  filledByBrokerId?: string;    // if filledBy = broker
  // Collaboration-specifics (optional, free-form)
  collabFloorsOffered?: number; // builder gives X floors back
  collabCashDelta?: number;     // cash difference (+/-)
  deletedAt?: string;           // soft-delete timestamp (trash bin)
}

export interface Match {
  id: string;
  buyerListingId: string;
  sellerListingId: string;
  score: number;
  outcomes: ("Brokerage" | "Trading" | "Collaboration")[];
  spread?: number;
  dealType?: DealType;
  minUrgency?: number;
}

export interface Deal {
  id: string;
  matchId?: string;
  title: string;
  buyerId: string;
  sellerId: string;
  brokerIds: string[];
  type: "Brokerage" | "Trading" | "Collaboration";
  subtype: string;
  stage: Stage;
  value: number;
  updatedAt: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  contactId: string;
  note: string;
  date: string;
}
