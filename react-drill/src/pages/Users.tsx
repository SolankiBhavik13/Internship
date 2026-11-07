
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { User } from '../types'
import { useTheme } from '../context/ThemeContext'

function Users() {
  const { theme } = useTheme()

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users')
        return res.json()
      })
      .then(data => setUsers(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false))
  }, [])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <p className={theme === 'dark' ? 'p-8 text-slate-400' : 'p-8 text-slate-600'}>
        Loading users...
      </p>
    )
  }

  if (error) {
    return (
      <p className="p-8 text-red-500">
        {error}
      </p>
    )
  }

  return (
    <div>
      <h1 className={`text-3xl font-bold mb-5 ${
        theme === 'dark' ? 'text-white' : 'text-slate-900'
      }`}>
        Users List
      </h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={`w-full p-3 rounded-lg mb-5 outline-none ${
          theme === 'dark'
            ? 'bg-slate-800 text-white placeholder-slate-400'
            : 'bg-white text-slate-900 placeholder-slate-500 border border-slate-300'
        }`}
      />

      <p className={`mb-4 ${
        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
      }`}>
        Showing {filteredUsers.length} of {users.length} users
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredUsers.map(user => (
          <Link
            to={`/users/${user.id}`}
            key={user.id}
            className={`block p-5 rounded-xl transition ${
              theme === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700'
                : 'bg-white hover:bg-slate-200 shadow'
            }`}
          >
            <h2 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              {user.name}
            </h2>

            <p className={
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }>
              {user.email}
            </p>

            <p className={`mt-2 text-sm ${
              theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
            }`}>
              {user.company.catchPhrase}
            </p>

            <p className={`mt-3 text-sm ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              View Details →
            </p>
          </Link>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className={`mt-5 ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          No users match your search - try another name.
        </p>
      )}
    </div>
  )
}

export default Users
