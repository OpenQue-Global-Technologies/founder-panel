export type TicketCategory = "Payments" | "Technical" | "Onboarding" | "Compliance" | "General";

export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface TicketMessage {
  id: string;
  author: string;
  role: "Partner" | "Founder Team";
  body: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  partnerName: string;
  category: TicketCategory;
  subject: string;
  createdAt: string;
  status: TicketStatus;
  messages: TicketMessage[];
}
