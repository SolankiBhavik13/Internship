
import { useState } from "react"

function LoginSwitch() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="p-6 text-slate-100">
      {isLoggedIn ? (
        <div>
          <p>Welcome back, student!</p>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="mt-3 rounded bg-red-500 px-4 py-2"
          >
            Log out
          </button>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setIsLoggedIn(true)
          }}
        >
          <input
            type="text"
            placeholder="Enter your name"
            className="rounded p-2 text-black"
          />
          <button
            type="submit"
            className="ml-2 rounded bg-blue-500 px-4 py-2"
          >
            Log in
          </button>
        </form>
      )}
    </div>
  )
}

export default LoginSwitch
