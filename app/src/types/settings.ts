export type TeamRole = "Founder" | "Co-Founder" | "Ops Admin";

export type TeamMemberStatus = "Active" | "Invited";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  lastActive: string;
  status: TeamMemberStatus;
}

export type ApiKeyStatus = "Active" | "Revoked";

export interface ApiKey {
  id: string;
  label: string;
  maskedKey: string;
  createdAt: string;
  lastUsed: string;
  status: ApiKeyStatus;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export type IntegrationStatus = "Connected" | "Not Connected";

export interface Integration {
  id: string;
  name: string;
  provider: string;
  status: IntegrationStatus;
  enabled: boolean;
}
