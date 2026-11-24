
import { useState } from "react"
import type { FormEvent } from "react"

import PageHeader from "../components/ui/PageHeader"
import supabase from "../lib/supabaseClient"

type AuthMode = "signup" | "signin"

type FormState = {
  name: string
  email: string
  password: string
}

function Login() {
  const [mode, setMode] = useState<AuthMode>("signin")

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(
    field: keyof FormState,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))

    setError("")
    setSuccess("")
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError("")
    setSuccess("")

    // Validate name during signup
    if (mode === "signup" && form.name.trim().length < 2) {
      setError("Name must contain at least 2 characters.")
      return
    }

    // Validate email
    const email = form.email.trim().toLowerCase()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    // Validate password
    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.")
      return
    }

    setIsSubmitting(true)

    try {
      if (mode === "signup") {
        // Create the authentication user
        const { data, error: authError } =
          await supabase.auth.signUp({
            email,
            password: form.password,
          })

        if (authError) throw authError

        // Create the agent profile using the same Auth user ID.
        // The non-null assertion indicates that a user is expected
        // when Supabase returns no authentication error.
        if (!data.user) {
          throw new Error("Unable to create authentication user.")
        }

        const { error: profileError } = await supabase
          .from("agents")
          .insert({
            id: data.user.id,
            name: form.name.trim(),
            email,
            role: "agent",
          })

        if (profileError) throw profileError

        console.log("Session:", data.session)

        setSuccess("Account created successfully! Signed in!")
      } else {
        // Sign in an existing user
        const { data, error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password: form.password,
          })

        if (authError) throw authError

        console.log("Session:", data.session)

        setSuccess("Signed in successfully!")
      }

      setForm({
        name: "",
        email: "",
        password: "",
      })
    } catch (err) {
      console.error("Authentication error:", err)

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-20">
      <PageHeader
        title="Agent Login"
        subtitle="Sign in or create an account to manage customer support tickets."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          {mode === "signin" ? "Agent Login" : "Create Account"}
        </h1>

        <p className="mt-2 text-slate-600">
          {mode === "signin"
            ? "Sign in to access the support dashboard."
            : "Create your agent account to get started."}
        </p>

        {/* Mode Toggle */}
        <div className="mt-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("signin")
              setError("")
              setSuccess("")
            }}
            className={`rounded-md px-4 py-2 font-medium transition ${
              mode === "signin"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("signup")
              setError("")
              setSuccess("")
            }}
            className={`rounded-md px-4 py-2 font-medium transition ${
              mode === "signup"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Name - Signup Only */}
          {mode === "signup" && (
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                placeholder="Enter your name"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              placeholder="agent@example.com"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              placeholder="Enter your password"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}

            {isSubmitting
              ? mode === "signin"
                ? "Signing in..."
                : "Creating account..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
