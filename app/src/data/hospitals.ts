import type { Doctor, Hospital, HospitalStatus, OperatingMode } from "../types/hospital";

const FIRST_NAMES = ["Neha", "Rajiv", "Sana", "Arjun", "Kavita", "Vikram", "Ananya", "Rohan", "Meera", "Karan"];
const LAST_NAMES = ["Kulkarni", "Menon", "Iyer", "Deshpande", "Reddy", "Nair", "Bhatt", "Chatterjee", "Malhotra", "Rao"];
const SPECIALTIES = ["Cardiology", "Orthopedics", "Pediatrics", "General Medicine", "Dermatology", "ENT", "Gynaecology"];

function initialsOf(name: string) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function generateSpecialists(seed: number, count: number): Doctor[] {
  const doctors: Doctor[] = [];
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[(seed + i) % FIRST_NAMES.length];
    const last = LAST_NAMES[(seed + i * 3) % LAST_NAMES.length];
    const name = `Dr. ${first} ${last}`;
    doctors.push({
      id: `${seed}-${i}`,
      name,
      initials: initialsOf(name),
      specialty: SPECIALTIES[(seed + i * 2) % SPECIALTIES.length],
      status: (seed + i) % 3 === 1 ? "Off Duty" : "On Duty",
      consultations: 40 + ((seed * 17 + i * 31) % 200),
    });
  }
  return doctors;
}

function generateRevenueTrend(seed: number): { month: string; value: number }[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month, i) => ({
    month,
    value: 35 + ((seed * 13 + i * 19) % 60),
  }));
}

interface SeedHospital {
  name: string;
  city: string;
  mode: OperatingMode;
  status: HospitalStatus;
  doctors: number;
  monthlyRevenue: number;
  commissionRate: number;
  totalAppointments?: number;
  systemIntegration?: boolean;
  specialists?: Doctor[];
  revenueTrend?: { month: string; value: number }[];
  commissionAudit?: { date: string; oldRate: number; newRate: number; changedBy: string }[];
}

const SEED_HOSPITALS: SeedHospital[] = [
  {
    name: "Apollo Care Multispecialty",
    city: "Mumbai",
    mode: "Full",
    status: "Active",
    doctors: 24,
    monthlyRevenue: 842000,
    commissionRate: 12,
    totalAppointments: 1284,
    systemIntegration: true,
    specialists: [
      { id: "apollo-nk", name: "Dr. Neha Kulkarni", initials: "NK", specialty: "Cardiology", status: "On Duty", consultations: 142 },
      { id: "apollo-rm", name: "Dr. Rajiv Menon", initials: "RM", specialty: "Orthopedics", status: "Off Duty", consultations: 98 },
      { id: "apollo-si", name: "Dr. Sana Iyer", initials: "SI", specialty: "Pediatrics", status: "On Duty", consultations: 176 },
      { id: "apollo-ad", name: "Dr. Arjun Deshpande", initials: "AD", specialty: "General Medicine", status: "On Duty", consultations: 210 },
    ],
    revenueTrend: [
      { month: "Jan", value: 52 },
      { month: "Feb", value: 60 },
      { month: "Mar", value: 48 },
      { month: "Apr", value: 72 },
      { month: "May", value: 80 },
      { month: "Jun", value: 94 },
    ],
    commissionAudit: [
      { date: "01 Jun 2026", oldRate: 10, newRate: 12, changedBy: "Priya Shah" },
      { date: "15 Jan 2026", oldRate: 8, newRate: 10, changedBy: "Priya Shah" },
    ],
  },
  {
    name: "Fortis Wellness Center",
    city: "Bengaluru",
    mode: "Team",
    status: "Active",
    doctors: 15,
    monthlyRevenue: 510000,
    commissionRate: 10,
    totalAppointments: 842,
  },
  {
    name: "Manipal City Hospital",
    city: "Pune",
    mode: "Solo",
    status: "Waiting",
    doctors: 3,
    monthlyRevenue: 0,
    commissionRate: 8,
    totalAppointments: 0,
  },
  {
    name: "Lilavati General",
    city: "Delhi",
    mode: "Team",
    status: "Delayed",
    doctors: 9,
    monthlyRevenue: 230000,
    commissionRate: 10,
    totalAppointments: 356,
  },
  {
    name: "CarePlus Diagnostics",
    city: "Chennai",
    mode: "Full",
    status: "Suspended",
    doctors: 0,
    monthlyRevenue: 0,
    commissionRate: 12,
    totalAppointments: 0,
    systemIntegration: false,
  },
  { name: "Sunrise Multi-Speciality", city: "Hyderabad", mode: "Team", status: "Active", doctors: 11, monthlyRevenue: 380000, commissionRate: 10 },
  { name: "Trinity Health Institute", city: "Ahmedabad", mode: "Full", status: "Active", doctors: 19, monthlyRevenue: 640000, commissionRate: 11 },
  { name: "Rainbow Children's Hospital", city: "Kolkata", mode: "Solo", status: "Waiting", doctors: 2, monthlyRevenue: 0, commissionRate: 8 },
  { name: "Metro Heart Institute", city: "Jaipur", mode: "Team", status: "Delayed", doctors: 7, monthlyRevenue: 175000, commissionRate: 9 },
  { name: "Aster Prime Hospital", city: "Kochi", mode: "Full", status: "Active", doctors: 21, monthlyRevenue: 720000, commissionRate: 12 },
  { name: "Sanjivani Care Hospital", city: "Nagpur", mode: "Solo", status: "Active", doctors: 4, monthlyRevenue: 96000, commissionRate: 8 },
  { name: "Global Multispecialty", city: "Surat", mode: "Team", status: "Suspended", doctors: 0, monthlyRevenue: 0, commissionRate: 10 },
  { name: "Wellspring Medical Center", city: "Lucknow", mode: "Full", status: "Active", doctors: 17, monthlyRevenue: 560000, commissionRate: 11 },
  { name: "Harmony Health Hub", city: "Indore", mode: "Solo", status: "Waiting", doctors: 3, monthlyRevenue: 0, commissionRate: 8 },
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildInitialHospitals(): Hospital[] {
  return SEED_HOSPITALS.map((seed, index) => ({
    id: slugify(seed.name),
    name: seed.name,
    city: seed.city,
    mode: seed.mode,
    status: seed.status,
    doctors: seed.doctors,
    monthlyRevenue: seed.monthlyRevenue,
    commissionRate: seed.commissionRate,
    activeDoctors: seed.doctors,
    totalAppointments: seed.totalAppointments ?? seed.doctors * 45,
    systemIntegration: seed.systemIntegration ?? seed.status === "Active",
    specialists: seed.specialists ?? generateSpecialists(index + 1, Math.max(seed.doctors, 1)),
    revenueTrend: seed.revenueTrend ?? generateRevenueTrend(index + 1),
    commissionAudit: seed.commissionAudit ?? [
      { date: "15 Jan 2026", oldRate: seed.commissionRate - 2, newRate: seed.commissionRate, changedBy: "Priya Shah" },
    ],
  }));
}

export function createHospital(input: {
  name: string;
  city: string;
  mode: OperatingMode;
  commissionRate: number;
  adminEmail: string;
  changedBy: string;
}): Hospital {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return {
    id: `${slugify(input.name)}-${Date.now()}`,
    name: input.name,
    city: input.city,
    mode: input.mode,
    status: "Waiting",
    doctors: 0,
    monthlyRevenue: 0,
    commissionRate: input.commissionRate,
    activeDoctors: 0,
    totalAppointments: 0,
    systemIntegration: false,
    adminEmail: input.adminEmail,
    specialists: [],
    revenueTrend: months.map((month) => ({ month, value: 0 })),
    commissionAudit: [
      {
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        oldRate: 0,
        newRate: input.commissionRate,
        changedBy: input.changedBy,
      },
    ],
  };
}

export function formatInr(amount: number): string {
  if (amount === 0) return "₹0";
  return "₹" + amount.toLocaleString("en-IN");
}
