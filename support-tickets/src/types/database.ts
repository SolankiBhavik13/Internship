
export type AgentRole = "agent" | "admin"

export type TicketCategory =
  | "billing"
  | "technical"
  | "account"
  | "other"

export type TicketPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent"

export type TicketStatus =
  | "open"
  | "in_progress"
  | "resolved"


export interface Agent {
  id: string
  name: string
  email: string
  role: AgentRole
}


export interface Ticket {
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


export interface TicketComment {
  id: string
  ticket_id: string
  agent_id: string | null
  comment: string
  created_at: string
}


export interface AiLog {
  id: string
  ticket_id: string
  ai_category: TicketCategory
  ai_priority: TicketPriority
  ai_reasoning: string
  created_at: string
}
