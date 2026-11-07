
import { Routes, Route, NavLink } from 'react-router'

import Home from './pages/Home'
import Users from './pages/Users'
import About from './pages/About'
import UserDetail from './pages/UserDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">

      <nav className="flex gap-2 bg-slate-800 px-6 py-4">

        <NavLink
          to="/"
          className={({ isActive }) =>
            "rounded-lg px-4 py-2 hover:bg-slate-700 " +
            (isActive ? "bg-indigo-500 text-white" : "")
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            "rounded-lg px-4 py-2 hover:bg-slate-700 " +
            (isActive ? "bg-indigo-500 text-white" : "")
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            "rounded-lg px-4 py-2 hover:bg-slate-700 " +
            (isActive ? "bg-indigo-500 text-white" : "")
          }
        >
          About
        </NavLink>

      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </div>
  )
}

export default App
