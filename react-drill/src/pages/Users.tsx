import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  email: string
  company: {
    catchPhrase: string
  }
}

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

  if (loading) return <p>Loading users...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Users List</h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 mb-5"
      />

      <p className="mb-4">
        Showing {filteredUsers.length} of {users.length} users
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-slate-800 p-5 rounded-xl">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-slate-300">{user.email}</p>
            <p className="mt-2 text-sm text-indigo-300">
              {user.company.catchPhrase}
            </p>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p>No users match your search - try another name.</p>
      )}
    </div>
  )
}

export default Users