
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { User } from '../types'

function Users() {
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
    return <p className="p-8 text-slate-400">Loading users...</p>
  }

  if (error) {
    return <p className="p-8 text-red-400">{error}</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Users List</h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 mb-5 outline-none"
      />

      <p className="mb-4 text-slate-300">
        Showing {filteredUsers.length} of {users.length} users
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredUsers.map(user => (
          <Link
            to={`/users/${user.id}`}
            key={user.id}
            className="block bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition"
          >
            <h2 className="text-xl font-bold">
              {user.name}
            </h2>

            <p className="text-slate-300">
              {user.email}
            </p>

            <p className="mt-2 text-sm text-indigo-300">
              {user.company.catchPhrase}
            </p>

            <p className="mt-3 text-sm text-indigo-400">
              View Details →
            </p>
          </Link>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="mt-5 text-slate-400">
          No users match your search - try another name.
        </p>
      )}
    </div>
  )
}

export default Users
