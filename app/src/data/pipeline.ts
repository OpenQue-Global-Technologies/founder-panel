import type { Hospital } from "../types/hospital";
import type { Lead, PipelineStage } from "../types/pipeline";

export const PIPELINE_STAGES: PipelineStage[] = [
  "Discovery",
  "LOI Signed",
  "Contract Signed",
  "Account Created",
  "Staff Trained",
  "Live",
];

const OWNERS = ["Priya Shah", "Arjun Mehta", "Divya Rao"];

interface ProspectSeed {
  hospitalName: string;
  city: string;
  stage: Exclude<PipelineStage, "Live">;
  owner: string;
  estMonthlyRevenue: number;
  lastActivity: string;
}

const PROSPECT_SEEDS: ProspectSeed[] = [
  { hospitalName: "Shanti Multispeciality", city: "Bhopal", stage: "Discovery", owner: "Priya Shah", estMonthlyRevenue: 280000, lastActivity: "2 days ago" },
  { hospitalName: "Vasant Care Hospital", city: "Nashik", stage: "Discovery", owner: "Arjun Mehta", estMonthlyRevenue: 190000, lastActivity: "4 days ago" },
  { hospitalName: "Coastal Health Institute", city: "Vizag", stage: "Discovery", owner: "Divya Rao", estMonthlyRevenue: 340000, lastActivity: "1 day ago" },
  { hospitalName: "Kaveri Speciality Clinic", city: "Coimbatore", stage: "LOI Signed", owner: "Divya Rao", estMonthlyRevenue: 260000, lastActivity: "3 days ago" },
  { hospitalName: "Northgate Multispecialty", city: "Chandigarh", stage: "LOI Signed", owner: "Priya Shah", estMonthlyRevenue: 410000, lastActivity: "6 hours ago" },
  { hospitalName: "Emerald Cross Hospital", city: "Bhubaneswar", stage: "Contract Signed", owner: "Arjun Mehta", estMonthlyRevenue: 300000, lastActivity: "1 day ago" },
  { hospitalName: "Sunflower Children's Hospital", city: "Vadodara", stage: "Contract Signed", owner: "Divya Rao", estMonthlyRevenue: 150000, lastActivity: "5 days ago" },
  { hospitalName: "Prakriti Wellness Hospital", city: "Dehradun", stage: "Account Created", owner: "Priya Shah", estMonthlyRevenue: 220000, lastActivity: "12 hours ago" },
  { hospitalName: "Zenith Ortho & Trauma Center", city: "Raipur", stage: "Staff Trained", owner: "Arjun Mehta", estMonthlyRevenue: 275000, lastActivity: "8 hours ago" },
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildInitialLeads(hospitals: Hospital[]): Lead[] {
  const liveLeads: Lead[] = hospitals.map((h, i) => ({
    id: `lead-live-${h.id}`,
    hospitalName: h.name,
    city: h.city,
    stage: "Live",
    owner: OWNERS[i % OWNERS.length],
    estMonthlyRevenue: h.monthlyRevenue,
    lastActivity: "Onboarded partner",
    hospitalId: h.id,
  }));

  const prospectLeads: Lead[] = PROSPECT_SEEDS.map((seed) => ({
    id: `lead-${slugify(seed.hospitalName)}`,
    hospitalName: seed.hospitalName,
    city: seed.city,
    stage: seed.stage,
    owner: seed.owner,
    estMonthlyRevenue: seed.estMonthlyRevenue,
    lastActivity: seed.lastActivity,
  }));

  return [...prospectLeads, ...liveLeads];
}

export function createLead(input: { hospitalName: string; city: string; owner: string; estMonthlyRevenue?: number }): Lead {
  return {
    id: `lead-${slugify(input.hospitalName)}-${Date.now()}`,
    hospitalName: input.hospitalName,
    city: input.city,
    stage: "Discovery",
    owner: input.owner,
    estMonthlyRevenue: input.estMonthlyRevenue,
    lastActivity: "Just added",
  };
}

export { OWNERS as PIPELINE_OWNERS };
