
import { Routes, Route, NavLink } from 'react-router'

import Home from './pages/Home'
import Users from './pages/Users'
import About from './pages/About'
import UserDetail from './pages/UserDetail'
import NotFound from './pages/NotFound'

import { useTheme } from './context/ThemeContext'

function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      className={`p-5 text-center ${
        theme === 'dark'
          ? 'bg-slate-800 text-slate-300'
          : 'bg-slate-200 text-slate-700'
      }`}
    >
      <p>My React Learning Project - 2026</p>
      <p className="text-sm mt-1">
        Built using React, TypeScript and React Router.
      </p>
    </footer>
  )
}

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === 'dark'
          ? 'bg-slate-900 text-slate-100'
          : 'bg-slate-100 text-slate-900'
      }`}
    >
      <nav
        className={`flex items-center gap-2 px-6 py-4 ${
          theme === 'dark'
            ? 'bg-slate-800'
            : 'bg-white shadow'
        }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded-lg px-4 py-2 hover:bg-indigo-500 hover:text-white ${
              isActive ? 'bg-indigo-500 text-white' : ''
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `rounded-lg px-4 py-2 hover:bg-indigo-500 hover:text-white ${
              isActive ? 'bg-indigo-500 text-white' : ''
            }`
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `rounded-lg px-4 py-2 hover:bg-indigo-500 hover:text-white ${
              isActive ? 'bg-indigo-500 text-white' : ''
            }`
          }
        >
          About
        </NavLink>

        <button
          onClick={toggleTheme}
          className="ml-auto rounded-lg bg-indigo-500 text-white px-4 py-2 hover:bg-indigo-600"
        >
          {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
        </button>
      </nav>

      <main className="p-6 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
