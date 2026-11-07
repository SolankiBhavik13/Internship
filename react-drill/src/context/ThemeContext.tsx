
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type Theme = 'dark' | 'light'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) || 'dark'
  )

  function toggleTheme() {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

      localStorage.setItem('theme', newTheme)

      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const ctx = useContext(ThemeContext)

  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return ctx
}

export { ThemeProvider, useTheme }
