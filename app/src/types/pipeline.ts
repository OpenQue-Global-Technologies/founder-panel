export type PipelineStage = "Discovery" | "LOI Signed" | "Contract Signed" | "Account Created" | "Staff Trained" | "Live";

export interface Lead {
  id: string;
  hospitalName: string;
  city: string;
  stage: PipelineStage;
  owner: string;
  estMonthlyRevenue?: number;
  lastActivity: string;
  hospitalId?: string;
}
