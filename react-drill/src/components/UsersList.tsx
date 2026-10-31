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

function UsersList() {
  // Step 2: Three states
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Step 3: Fetch API data
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

  // Step 4: Loading state
  if (loading) {
    return (
      <p className="p-8 text-slate-400">
        Loading users...
      </p>
    )
  }

  // Step 5: Error state
  if (error) {
    return (
      <p className="p-8 text-red-400">
        {error}
      </p>
    )
  }

  // Step 6: Display users
  return (
    <div className="mx-auto max-w-3xl p-6">

      <h1 className="mb-2 text-3xl font-bold">
        Users List
      </h1>

      {/* User count */}
      <p className="mb-5 text-slate-400">
        {users.length} users loaded
      </p>

      {/* User cards */}
      <div className="grid gap-4 sm:grid-cols-2">

        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-xl bg-slate-800 p-5 shadow-lg"
          >
            <h2 className="font-bold text-white">
              {user.name}
            </h2>

            <p className="mt-2 text-sm text-blue-400">
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