export interface Resource {
  id: string;
  title: string;
  description: string;
  branch: string;
  semester: number;
  type: 'donate' | 'sell';
  price?: number;
  offeredBy: string;
  dateAdded: string;
  claimed: boolean;
  claimedBy?: string;
  motivationalMessage: string;
  handoverInstructions: string;
  contactInfo: string;
  pages?: number; // For impact calculation
  points?: number; // Points awarded when claimed
}

export interface User {
  id: string;
  name: string;
  branch: string;
  semester: number;
  resourcesShared: number;
  resourcesClaimed: number;
  totalValue: number;
  points: number;
}

export interface Suggestion {
  id: string;
  message: string;
  author: string;
  branch: string;
  semester: number;
  targetSemester: number;
  dateAdded: string;
  likes: number;
}

export interface ResourceRequest {
  id: string;
  title: string;
  description: string;
  branch: string;
  semester: number;
  requestedBy: string;
  dateRequested: string;
  fulfilled: boolean;
}

export interface BranchRepresentative {
  id: string;
  name: string;
  branch: string;
  semester: number;
  contactInfo: string;
  role: string;
}

export interface PlatformStats {
  totalResources: number;
  totalClaimed: number;
  moneySaved: number;
  environmentalImpact: number;
  lastActivity: string;
  communityHealth: number; // 0-100
}

export interface ResourceGroup {
  title: string;
  description: string;
  resources: Resource[];
  totalAvailable: number;
}

export const RESOURCE_POINTS = {
  'Mini Drafter': 5,
  'Sheet Holder': 3,
  'Higher Engineering Mathematics': 10,
  'Data Structures & Algorithms Textbook': 10,
  'Digital Electronics Lab Manual': 8,
  'PYQS - Previous Year Question Papers': 15,
  'Concrete Technology Reference Book': 10,
  'Java Programming Notes': 8,
  'Engineering Graphics Drafting Set': 5,
  'default': 5
};