
import { useParams, Link } from 'react-router'
import { useEffect, useState } from 'react'
import type { User } from '../types'

function UserDetail() {
  const { id } = useParams()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
     setLoading(true)
    setError(null)
    setUser(null)
    
    async function load() {
      try {
        if (!id || !/^[1-9]\d*$/.test(id)) {
          throw new Error('Invalid user ID')
        }

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        )

        if (!res.ok) {
          throw new Error('User not found')
        }

        setUser((await res.json()) as User)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Could not load user'
        )
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) {
    return <p className="p-8 text-slate-400">Loading user...</p>
  }

  if (error) {
    return <p className="p-8 text-red-400">{error}</p>
  }

  if (!user) {
    return <p className="p-8 text-slate-400">User not found</p>
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-slate-800 p-6">
      <h2 className="text-2xl font-bold">{user.name}</h2>

      <p className="mt-2 text-slate-400">{user.email}</p>

      <p className="mt-3">Username: {user.username}</p>

      <p className="mt-2">Phone: {user.phone}</p>

      <p className="mt-2">Website: {user.website}</p>

      <p className="mt-3 text-sm">
        Works at {user.company.name}
      </p>

      <p className="mt-2 text-sm text-slate-400">
        City: {user.address.city}
      </p>

      <Link
        to="/users"
        className="mt-5 inline-block text-indigo-400 hover:underline"
      >
        ← Back to all users
      </Link>
    </div>
  )
}

export default UserDetail
