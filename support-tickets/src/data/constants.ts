
import type {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from "../types/database"

// Ticket Categories
export const TICKET_CATEGORY = {
  BILLING: "billing",
  TECHNICAL: "technical",
  ACCOUNT: "account",
  OTHER: "other",
} as const

// Ticket Priorities
export const TICKET_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const

// Ticket Status
export const TICKET_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
} as const

// Priority Sorting
export const PRIORITY_ORDER: Record<TicketPriority, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
}

// Priority Colors
export const PRIORITY_COLORS: Record<TicketPriority, string> = {
  low: "bg-slate-500/20 text-slate-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-orange-500/20 text-orange-400",
  urgent: "bg-red-500/20 text-red-400",
}

// Status Colors
export const STATUS_COLORS: Record<TicketStatus, string> = {
  open: "bg-blue-500/20 text-blue-400",
  in_progress: "bg-amber-500/20 text-amber-400",
  resolved: "bg-green-500/20 text-green-400",
}

// Category Colors
export const CATEGORY_COLORS: Record<TicketCategory, string> = {
  billing: "bg-purple-500/20 text-purple-400",
  technical: "bg-sky-500/20 text-sky-400",
  account: "bg-teal-500/20 text-teal-400",
  other: "bg-slate-500/20 text-slate-400",
}
