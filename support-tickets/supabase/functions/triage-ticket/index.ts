
import { corsHeaders } from "../_shared/cors.ts"

export default {
  fetch: async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders })
    }

    try {
      const { ticketId } = await req.json()

      if (!ticketId) {
        return new Response(
          JSON.stringify({ error: "ticketId is required" }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          },
        )
      }

      const geminiKey = Deno.env.get("GEMINI_API_KEY")

      if (!geminiKey) {
        return new Response(
          JSON.stringify({
            error: "AI is not configured on the server",
          }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          },
        )
      }

      // Tomorrow: load the ticket, call Gemini,
      // update the ticket and write ai_logs.

      return new Response(
        JSON.stringify({
          received: { ticketId },
          geminiKeyPresent: true,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      )
    } catch (err) {
      return new Response(
        JSON.stringify({ error: String(err) }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      )
    }
  },
}
