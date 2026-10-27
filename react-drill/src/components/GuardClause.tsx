
import { useState } from "react"

function GuardClause() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="p-6">
        <p className="text-slate-400">Please log in</p>
        <button
          onClick={() => setIsLoggedIn(true)}
          className="mt-3 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Log in
        </button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <p>Welcome back, student!</p>
      <button
        onClick={() => setIsLoggedIn(false)}
        className="mt-3 rounded bg-red-500 px-4 py-2 text-white"
      >
        Log out
      </button>
    </div>
  )
}

export default GuardClause
