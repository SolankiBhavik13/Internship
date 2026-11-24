import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

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

  const location = useLocation();
  const navigate = useNavigate();

  const from =
    (location.state as { from?: { pathname?: string } } | null)
      ?.from?.pathname ?? "/dashboard";

  const [mode, setMode] = useState<AuthMode>("signin");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (session) {
    return <Navigate to={from} replace />;
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
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
      setError("Password needs at least 8 characters.");
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

        if (authError) {
          const message = authError.message.toLowerCase();

          if (
            message.includes("already registered") ||
            message.includes("already exists") ||
            message.includes("already been registered")
          ) {
            throw new Error("That email already has an account.");
          }

          throw authError;
        }

        if (!data.user) {
          throw new Error("Unable to create the authentication account.");
        }

        // Supabase can return an empty identities array for an existing email.
        if (
          data.user.identities &&
          data.user.identities.length === 0
        ) {
          throw new Error("That email already has an account.");
        }

        const { error: profileError } = await supabase
          .from("agents")
          .insert({
            id: data.user.id,
            name: form.name.trim(),
            email,
            role: "agent",
          });

        if (profileError) {
          throw profileError;
        }

        // If email confirmation is enabled, the user must confirm first.
        if (!data.session) {
          setSuccess(
            "Account created. Check your email to confirm your account."
          );

          setForm({
            name: "",
            email: "",
            password: "",
          });

          return;
        }
      } else {
        const { error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password: form.password,
          });

        if (authError) {
          const message = authError.message.toLowerCase();

          if (message.includes("invalid login credentials")) {
            throw new Error("Invalid login credentials.");
          }

          throw authError;
        }
      }

      setForm({
        name: "",
        email: "",
        password: "",
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Authentication error:", err);

      if (err instanceof Error) {
        const message = err.message.toLowerCase();

        if (
          mode === "signup" &&
          (message.includes("already registered") ||
            message.includes("already exists"))
        ) {
          setError("That email already has an account.");
        } else if (message.includes("invalid login credentials")) {
          setError("Invalid login credentials.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Authentication failed. Please try again.");
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
            disabled={isSubmitting}
            onClick={() => changeMode("signin")}
            className={`rounded-md px-4 py-2 font-medium transition ${
              mode === "signin"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Sign In
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => changeMode("signup")}
            className={`rounded-md px-4 py-2 font-medium transition ${
              mode === "signup"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {mode === "signup" && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-medium text-slate-700"
              >
                Full Name
              </label>

              <input
                id="name"
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

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-slate-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              placeholder="agent@example.com"
              autoComplete="email"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              placeholder="Enter your password"
              autoComplete={
                mode === "signup"
                  ? "new-password"
                  : "current-password"
              }
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
            />

            {form.password.length < 8 && (
              <p className="mt-2 text-sm text-amber-600">
                Password needs at least 8 characters.
              </p>
            )}
          </div>

          {error && (
            <p
              role="alert"
              className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              <span aria-hidden="true">⚠</span>
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
            >
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