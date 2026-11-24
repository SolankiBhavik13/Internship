
import { useState } from "react"
import type { FormEvent } from "react"
import { triageTicket } from "../lib/triage"

type FormState = {
  name: string
  email: string
  subject: string
  description: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

export default function Home() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    description: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSaving, setIsSaving] = useState(false)

  // Update one field
  function setField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }))

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }))
  }

  // Validate form
  function validateForm() {
    const newErrors: FormErrors = {}

    if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters."
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
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

  // Submit form
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isSaving) return

    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    try {
      const decision = await triageTicket(
        form.subject,
        form.description
      )

      const ticket = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        description: form.description.trim(),
      }

      console.log("Submitted Ticket:", {
        ticket,
        decision,
      })
    } finally {
      setIsSaving(false)
    }
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

      {/* Submit Ticket Form */}
      <section className="max-w-xl mx-auto px-4 pb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">
            Submit a Ticket
          </h2>

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
                  onChange={(e) => setField("name", e.target.value)}
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
                  onChange={(e) => setField("email", e.target.value)}
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
                onChange={(e) => setField("subject", e.target.value)}
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
                onChange={(e) => setField("description", e.target.value)}
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
      </section>

    </div>
  )
}
