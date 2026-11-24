
// Ticket Categories
export const TICKET_CATEGORY = {
  BILLING: "billing",
  TECHNICAL: "technical",
  ACCOUNT: "account",
  OTHER: "other",
} as const

export type TicketCategory =
  (typeof TICKET_CATEGORY)[keyof typeof TICKET_CATEGORY]

// Ticket Priorities
export const TICKET_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const

export type TicketPriority =
  (typeof TICKET_PRIORITY)[keyof typeof TICKET_PRIORITY]

// Ticket Status
export type TicketStatus =
  | "open"
  | "in_progress"
  | "resolved"

// Ticket Type
export type Ticket = {
  id: string
  customer_name: string
  customer_email: string
  subject: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  assigned_to: string | null
  created_at: string
}
