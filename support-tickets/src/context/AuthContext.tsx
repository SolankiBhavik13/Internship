
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import type { ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"

import supabase from "../lib/supabaseClient"
import type { Agent } from "../types/database"

type AuthContextValue = {
  session: Session | null
  agent: Agent | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [session, setSession] = useState<Session | null>(null)
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)

  // Check the existing session and listen for authentication changes
  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const { data, error } = await supabase.auth.getSession()

      if (!mounted) return

      if (error) {
        console.error("Session error:", error)
      }

      setSession(data.session)
      setLoading(false)
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Load the agent profile whenever the session changes
  useEffect(() => {
    let active = true

    async function loadAgent() {
      if (!session) {
        setAgent(null)
        return
      }

      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle()

      if (!active) return

      if (error) {
        console.error("Agent loading error:", error)
        setAgent(null)
        return
      }

      setAgent((data as Agent) ?? null)
    }

    loadAgent()

    return () => {
      active = false
    }
  }, [session])

  const value: AuthContextValue = {
    session,
    agent,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to access authentication information
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}
