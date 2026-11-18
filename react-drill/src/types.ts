
export type Student = {
  id: string;
  name: string;
  role?: string;
  skills?: string[];
  rollNumber?: string | number;
  validTill?: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
};

export type TicketStatus = "open" | "in_progress" | "resolved";

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
};
