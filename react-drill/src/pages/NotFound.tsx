
import { Link } from 'react-router'

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">

      <h1 className="text-8xl font-bold text-indigo-500">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold">
        Page Not Found!
      </h2>

      <p className="mt-3 text-slate-400">
        Oops! Looks like you are lost. This page does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-500 px-5 py-2 hover:bg-indigo-600"
      >
        Back to Home
      </Link>

    </div>
  )
}

export default NotFound
