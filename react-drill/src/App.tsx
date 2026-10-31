
import { useEffect, useState } from "react"

// Reflection:
// I need to lift state up when two or more sibling components
// need to access or update the same data.

type User = {
  id: number
  name: string
  email: string
  company: {
    catchPhrase: string
  }
}

// Spinner component
function Spinner() {
  return (
    <div className="mx-auto mt-16 h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-indigo-400" />
  )
}

// SearchBar: receives value and onChange through props
function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (newValue: string) => void
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name or email"
      className="w-full rounded-lg bg-slate-800 px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  )
}

// UserList: receives data through props, with no state of its own
function UserList({
  users,
  filtered,
  loading,
  error,
}: {
  users: User[]
  filtered: User[]
  loading: boolean
  error: string | null
}) {
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <p className="mt-6 text-red-400">{error}</p>
  }

  if (users.length === 0) {
    return (
      <p className="mt-6 text-center text-slate-400">
        No users found on the server.
      </p>
    )
  }

  if (filtered.length === 0) {
    return (
      <p className="mt-6 text-center text-slate-400">
        No users match your search - try another name.
      </p>
    )
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {filtered.map((user) => (
        <div
          key={user.id}
          className="rounded-xl bg-slate-800 p-5 shadow-lg"
        >
          <h2 className="font-bold text-white">{user.name}</h2>

          <p className="mt-2 text-sm text-indigo-400">
            {user.email}
          </p>

          <p className="mt-3 text-xs text-slate-400">
            {user.company.catchPhrase}
          </p>
        </div>
      ))}
    </div>
  )
}

// Parent component: owns all shared state and fetching
function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        )

        if (!response.ok) {
          throw new Error("Server said " + response.status)
        }

        const data = (await response.json()) as User[]
        setUsers(data)
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Could not load users"
        )
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Compute filtered users during render (not in state)
  const q = search.trim().toLowerCase()

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q)
  )

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Users List</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

          {/* Second consumer of search/results data */}
          <p className="text-sm text-slate-400">
            Showing {filtered.length} of {users.length} users
          </p>
        </div>

        <UserList
          users={users}
          filtered={filtered}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default App
