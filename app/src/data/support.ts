import type { Ticket } from "../types/support";

export function buildInitialTickets(): Ticket[] {
  return [
    {
      id: "TKT-1042",
      partnerName: "Lilavati General",
      category: "Payments",
      subject: "Commission owed for June doesn't match our ledger",
      createdAt: "24 Aug 2026",
      status: "Open",
      messages: [
        {
          id: "m1",
          author: "Rohan Kapadia (Lilavati General)",
          role: "Partner",
          body: "Our finance team is showing ₹2,30,000 in cash revenue for June but the commission owed on the dashboard looks off by about ₹4,000. Can someone check?",
          timestamp: "24 Aug, 10:12 AM",
        },
      ],
    },
    {
      id: "TKT-1041",
      partnerName: "CarePlus Diagnostics",
      category: "Payments",
      subject: "Understanding the suspension impact on outstanding commission",
      createdAt: "23 Aug 2026",
      status: "In Progress",
      messages: [
        {
          id: "m1",
          author: "Meena Subramaniam (CarePlus Diagnostics)",
          role: "Partner",
          body: "Our account was suspended last week. Do we still owe commission on cash collected before the suspension date?",
          timestamp: "23 Aug, 4:45 PM",
        },
        {
          id: "m2",
          author: "Priya Shah",
          role: "Founder Team",
          body: "Yes — commission is owed on all cash collected prior to suspension. We'll send a final invoice for that period; suspension only pauses future accrual.",
          timestamp: "23 Aug, 5:30 PM",
        },
      ],
    },
    {
      id: "TKT-1039",
      partnerName: "Manipal City Hospital",
      category: "Onboarding",
      subject: "Staff still can't see the queue dashboard",
      createdAt: "21 Aug 2026",
      status: "Open",
      messages: [
        {
          id: "m1",
          author: "Dr. Kavita Rao (Manipal City Hospital)",
          role: "Partner",
          body: "Our front desk staff logged in but the queue dashboard shows no doctors. Is there a setup step we missed?",
          timestamp: "21 Aug, 9:02 AM",
        },
      ],
    },
    {
      id: "TKT-1035",
      partnerName: "Apollo Care Multispecialty",
      category: "Technical",
      subject: "WebSocket disconnects during peak hours",
      createdAt: "19 Aug 2026",
      status: "In Progress",
      messages: [
        {
          id: "m1",
          author: "IT Desk (Apollo Care Multispecialty)",
          role: "Partner",
          body: "Between 6-8pm our reception screens keep losing the live queue connection and need a manual refresh.",
          timestamp: "19 Aug, 6:40 PM",
        },
        {
          id: "m2",
          author: "Arjun Mehta",
          role: "Founder Team",
          body: "Thanks for flagging — we're seeing elevated WebSocket drop rates on our end too during that window. Engineering is investigating the load balancer config.",
          timestamp: "20 Aug, 9:15 AM",
        },
      ],
    },
    {
      id: "TKT-1028",
      partnerName: "Fortis Wellness Center",
      category: "Compliance",
      subject: "Request for our DPDP data processing agreement copy",
      createdAt: "15 Aug 2026",
      status: "Resolved",
      messages: [
        {
          id: "m1",
          author: "Legal (Fortis Wellness Center)",
          role: "Partner",
          body: "Could you send us a signed copy of the data processing agreement for our compliance records?",
          timestamp: "15 Aug, 11:00 AM",
        },
        {
          id: "m2",
          author: "Divya Rao",
          role: "Founder Team",
          body: "Sent to your registered admin email. Let us know if you need it re-sent.",
          timestamp: "15 Aug, 2:20 PM",
        },
      ],
    },
    {
      id: "TKT-1019",
      partnerName: "Sunrise Multi-Speciality",
      category: "General",
      subject: "Adding a second admin login",
      createdAt: "10 Aug 2026",
      status: "Closed",
      messages: [
        {
          id: "m1",
          author: "Front Office (Sunrise Multi-Speciality)",
          role: "Partner",
          body: "Can we get a second admin login for our operations manager?",
          timestamp: "10 Aug, 8:30 AM",
        },
        {
          id: "m2",
          author: "Priya Shah",
          role: "Founder Team",
          body: "Done — invite sent to the email you provided.",
          timestamp: "10 Aug, 3:10 PM",
        },
      ],
    },
  ];
}
