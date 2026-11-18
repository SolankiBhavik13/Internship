
import type { Ticket } from "../types";

export const seedTickets: Ticket[] = [
  {
    id: "1",
    subject: "Login page not working",
    description: "Users are unable to log in to their accounts.",
    priority: "urgent",
    status: "open",
    createdAt: "2026-11-18T09:00:00",
  },
  {
    id: "2",
    subject: "Update dashboard design",
    description: "The dashboard needs a cleaner layout.",
    priority: "high",
    status: "open",
    createdAt: "2026-11-18T10:00:00",
  },
  {
    id: "3",
    subject: "Fix navigation menu",
    description: "Some navigation links are not working correctly.",
    priority: "medium",
    status: "in_progress",
    createdAt: "2026-11-18T11:00:00",
  },
  {
    id: "4",
    subject: "Add contact information",
    description: "Add contact details to the About page.",
    priority: "low",
    status: "in_progress",
    createdAt: "2026-11-18T12:00:00",
  },
  {
    id: "5",
    subject: "Fix footer alignment",
    description: "The footer alignment issue has been corrected.",
    priority: "medium",
    status: "resolved",
    createdAt: "2026-11-18T13:00:00",
  },
];
