
import { useState, useRef } from "react"
import type { FormEvent } from "react"

import supabase  from "../lib/supabaseClient"
import { triageTicket } from "../lib/triage"
import { TICKET_STATUS } from "../data/constants"

import type {
  TicketCategory,
  TicketPriority,
} from "../types/database"

type FormState = {
  name: string
  email: string
  subject: string
  description: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

type SubmittedTicket = {
  id: string
  subject: string
  category: TicketCategory
  priority: TicketPriority
  reasoning: string
}

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  description: "",
}

export default function Home() {
  const [form, setForm] = useState<FormState>(initialForm)

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSaving, setIsSaving] = useState(false)

  const [submitError, setSubmitError] = useState("")
  const [submitted, setSubmitted] =
    useState<SubmittedTicket | null>(null)

  // Prevent multiple submissions
  const submittingRef = useRef(false)

  // Update individual form fields
  function setField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }))

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }))

    setSubmitError("")
  }

  // Validate form
  function validateForm() {
    const newErrors: FormErrors = {}

    if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters."
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address."
    }

    if (form.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters."
    }

    if (form.description.trim().length < 30) {
      newErrors.description =
        "Description must be at least 30 characters."
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // Submit ticket to Supabase
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (submittingRef.current) return

    if (!validateForm()) return

    submittingRef.current = true
    setIsSaving(true)
    setSubmitError("")

    try {
      // Step 1: Run AI triage
      const triage = await triageTicket(
        form.subject.trim(),
        form.description.trim()
      )

      // Step 2: Insert ticket into Supabase
      const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .insert({
          customer_name: form.name.trim(),
          customer_email: form.email.trim().toLowerCase(),
          subject: form.subject.trim(),
          description: form.description.trim(),
          category: triage.category,
          priority: triage.priority,
          status: TICKET_STATUS.OPEN,
        })
        .select()
        .single()

      // Stop if ticket insertion fails
      if (ticketError || !ticket) {
        console.error("Ticket insertion failed:", ticketError)

        setSubmitError(
          "We couldn't submit your ticket right now. Please try again."
        )

        return
      }

      // Step 3: Insert AI log linked to ticket
      const { error: logError } = await supabase
        .from("ai_logs")
        .insert({
          ticket_id: ticket.id,
          ai_category: triage.category,
          ai_priority: triage.priority,
          ai_reasoning: triage.reasoning,
        })

      // Log failure but keep the successful ticket
      if (logError) {
        console.error("AI log insertion failed:", logError)
      }

      // Step 4: Store confirmation information
      setSubmitted({
        id: ticket.id,
        subject: ticket.subject,
        category: triage.category,
        priority: triage.priority,
        reasoning: triage.reasoning,
      })

      // Step 5: Reset form after successful ticket insertion
      setForm({ ...initialForm })
      setErrors({})

    } catch (error) {
      console.error("Submission error:", error)

      setSubmitError(
        "Something went wrong. Please try again."
      )
    } finally {
      submittingRef.current = false
      setIsSaving(false)
    }
  }

  // Submit another ticket
  function handleNewTicket() {
    setForm({ ...initialForm })
    setErrors({})
    setSubmitError("")
    setSubmitted(null)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">
          How can we help you?
        </h1>

        <p className="text-slate-400 text-lg">
          Submit a ticket and our support team will get back to you.
        </p>
      </section>

      <section className="max-w-xl mx-auto px-4 pb-16">

        {/* Confirmation Panel */}
        {submitted ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center shadow-lg">

            <div className="flex justify-center mb-5">
              <div className="bg-green-500/10 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-green-400"
                >
                  <path d="M20 6 9 17l-5-5" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-green-400 mb-3">
              Ticket Submitted Successfully!
            </h2>

            <p className="text-white font-medium mb-3">
              {submitted.subject}
            </p>

            <p className="text-slate-400 text-sm leading-6 mb-6">
              Our AI is reviewing your ticket - you will see its
              category and priority on the confirmation shortly.
            </p>

            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <p className="text-xs text-slate-400 mb-1">
                Ticket ID
              </p>

              <p className="text-sm text-slate-200 break-all">
                {submitted.id}
              </p>
            </div>

            <button
              type="button"
              onClick={handleNewTicket}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Submit another ticket
            </button>

          </div>
        ) : (

          /* Submit Ticket Form */
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">

            <h2 className="text-2xl font-semibold mb-6">
              Submit a Ticket
            </h2>

            {/* Submission Error */}
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4 mb-5 text-sm">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name and Email */}
              <div className="grid sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Customer Name
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setField("name", e.target.value)
                    }
                    placeholder="Enter your name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.name && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Customer Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setField("email", e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setField("subject", e.target.value)
                  }
                  placeholder="Enter ticket subject"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.subject && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Description
                </label>

                <textarea
                  rows={6}
                  value={form.description}
                  onChange={(e) =>
                    setField("description", e.target.value)
                  }
                  placeholder="Describe your issue in detail..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />

                {errors.description && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.description}
                  </p>
                )}

                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-slate-500">
                    The more detail you give, the better the AI can triage.
                  </p>

                  <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                    {form.description.length} characters
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                {isSaving ? "Submitting..." : "Submit Ticket"}
              </button>

            </form>
          </div>
        )}

      </section>
    </div>
  )
}
