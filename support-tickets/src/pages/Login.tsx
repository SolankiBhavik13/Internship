
import PageHeader from "../components/ui/PageHeader"
import { useEffect } from "react"
import supabase from "../lib/supabaseClient"

function Login() {
  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession()

      console.log("Current session:", data)
      console.log("Session error:", error)
    }

    checkSession()
  }, [])

  return (
    <div className="mx-auto max-w-lg px-6 py-20">
      <PageHeader
        title="Agent Login"
        subtitle="Sign in to your account to manage customer support tickets"
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Agent Login
        </h1>

        <p className="mt-2 text-slate-600">
          Sign in to access the support dashboard.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="agent@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>

        <p className="mt-5 text-sm text-slate-500">
          Supabase authentication will be connected in Week 7.
        </p>
      </div>
    </div>
  )
}

export default Login
