// Type definitions for the Startup Benefits Platform

export type DealCategory =
  | 'infrastructure'
  | 'analytics'
  | 'marketing'
  | 'development'
  | 'productivity'
  | 'security'
  | 'design'
  | 'communication';

export type DealAccessLevel = 'public' | 'locked' | 'premium';

export type ClaimStatus = 'pending' | 'approved' | 'rejected';

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
}

export interface EligibilityCriteria {
  minFunding?: number;
  maxAge?: number; // company age in months
  requirements?: string[];
}

export interface Deal {
  _id: string

  title: string
  description: string
  category: "cloud" | "marketing" | "devtools" | "finance" | "productivity"

  isLocked: boolean
  requiresVerified: boolean
  requiresPremium: boolean

  value?: string
  savings?: string

  claimedCount?: number
  validUntil?: string

  features: string[]

  eligibility?: {
    minFunding?: number
    maxAge?: number
    requirements?: string[]
  }

  partner: {
    name: string
    logo: string
    description?: string
    website?: string
  }

  termsUrl?: string
}






export interface ClaimedDeal {
  id: string;
  deal: Deal;
  claimedAt: string;
  status: ClaimStatus;
  statusMessage?: string;
  redeemedAt?: string;
  expiresAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company?: {
    name: string;
    founded?: string;
    funding?: number;
  };
  accessLevel: 'free' | 'premium';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}