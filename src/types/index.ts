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
}

export interface User {
  id: string;
  name: string;
  branch: string;
  semester: number;
  resourcesShared: number;
  resourcesClaimed: number;
  totalValue: number;
}

export interface Suggestion {
  id: string;
  message: string;
  author: string;
  branch: string;
  semester: number;
  targetSemester: number; // For which semester this tip is intended
  dateAdded: string;
  likes: number;
}

export interface PlatformStats {
  totalResources: number;
  totalClaimed: number;
  moneySaved: number;
  environmentalImpact: number;
  lastActivity: string;
}

export interface ResourceGroup {
  title: string;
  description: string;
  resources: Resource[];
  totalAvailable: number;
}