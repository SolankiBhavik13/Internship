
import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate } from "react-router";

import PageHeader from "../components/ui/PageHeader";
import supabase from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

type AuthMode = "signup" | "signin";

type FormState = {
  name: string;
  email: string;
  password: string;
};

function Login() {
  const { session, loading } = useAuth();

  const [mode, setMode] = useState<AuthMode>("signin");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect already signed-in users to dashboard
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (mode === "signup" && form.name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    const email = form.email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        const { data, error: authError } =
          await supabase.auth.signUp({
            email,
            password: form.password,
          });

        if (authError) throw authError;

        if (!data.user) {
          throw new Error("Unable to create authentication user.");
        }

        const { error: profileError } = await supabase
          .from("agents")
          .insert({
            id: data.user.id,
            name: form.name.trim(),
            email,
            role: "agent",
          });

        if (profileError) throw profileError;

        setSuccess("Account created successfully!");
      } else {
        const { error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password: form.password,
          });

        if (authError) throw authError;

        setSuccess("Signed in successfully!");
      }

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Authentication error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
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

        <div className="mt-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError("");
              setSuccess("");
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
              setMode("signup");
              setError("");
              setSuccess("");
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

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {mode === "signup" && (
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your name"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="agent@example.com"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Enter your password"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

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
  );
}

export default Login;
