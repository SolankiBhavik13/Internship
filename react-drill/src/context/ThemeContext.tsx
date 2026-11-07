
import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

type Theme = "dark" | "light"

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>(
    "theme",
    "dark"
  )

  function toggleTheme() {
    setTheme(currentTheme =>
      currentTheme === "dark" ? "light" : "dark"
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}

export { ThemeProvider, useTheme }
