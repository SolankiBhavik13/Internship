import { useEffect, useState } from "react"

// Step 1: Define User type
type User = {
  id: number
  name: string
  email: string
  company: {
    catchPhrase: string
  }
}

// Step 1: Spinner component
function Spinner() {
  return (
    <div className="mx-auto mt-16 h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-indigo-400" />
  )
}

function UsersList() {
  // Step 2: Three states
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Step 2: Search state
  const [search, setSearch] = useState("")

  // Step 3: Fetch API
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
          err instanceof Error
            ? err.message
            : "Could not load users"
        )

      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Step 3: Filter users before return
  const q = search.trim().toLowerCase()

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
  )

  // Step 4: Loading state
  if (loading) {
    return <Spinner />
  }

  // Error state
  if (error) {
    return (
      <p className="p-8 text-red-400">
        {error}
      </p>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6">

      {/* Heading */}
      <h1 className="mb-2 text-3xl font-bold">
        Users List
      </h1>

      {/* Step 5: Results count */}
      <p className="mb-5 text-sm text-slate-400">
        Showing {filtered.length} of {users.length} users
      </p>

      {/* Step 2 and 6: Search input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="mb-6 w-full rounded-xl border border-slate-600 bg-slate-800 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Step 4: Empty messages */}
      {filtered.length === 0 && (
        <p className="p-8 text-center text-slate-400">
          {users.length === 0
            ? "No users found on the server."
            : "No users match your search - try another name."}
        </p>
      )}

      {/* Step 3: Display filtered users */}
      <div className="grid gap-4 sm:grid-cols-2">

        {filtered.map((user) => (
          <div
            key={user.id}
            className="rounded-xl bg-slate-800 p-5 shadow-lg transition hover:bg-slate-700"
          >
            <h2 className="font-bold text-white">
              {user.name}
            </h2>

            <p className="mt-2 text-sm text-indigo-400">
              {user.email}
            </p>

            <p className="mt-3 text-xs text-slate-400">
              {user.company.catchPhrase}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default UsersList