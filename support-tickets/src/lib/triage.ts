
import type {
  TicketCategory,
  TicketPriority,
} from "../types/database"

import {
  TICKET_CATEGORY,
  TICKET_PRIORITY,
} from "../types/database"

export type TriageResult = {
  category: TicketCategory
  priority: TicketPriority
  reasoning: string
}

// Week 8 replaces this body with a real Supabase Edge Function call to Gemini.
export async function triageTicket(
  subject: string,
  description: string
): Promise<TriageResult> {

  console.log("AI triage will run for:", subject, description)

  return {
    category: TICKET_CATEGORY.OTHER,
    priority: TICKET_PRIORITY.MEDIUM,
    reasoning: "AI triage pending - placeholder decision.",
  }
}
