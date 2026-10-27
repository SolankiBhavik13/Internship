
import { useState } from "react"

function LevelColors() {
  const [level, setLevel] = useState(0)

  const barColor =
    level >= 80
      ? "bg-green-500"
      : level >= 40
      ? "bg-yellow-500"
      : "bg-red-500"

  return (
    <div className="p-6 text-slate-100">
      <p className="mb-2">Level: {level}%</p>

      <div className="h-5 w-full rounded-full bg-slate-600">
        <div
          className={`h-5 rounded-full ${barColor}`}
          style={{ width: `${level}%` }}
        />
      </div>

      <button
        onClick={() =>
          setLevel((current) => Math.min(current + 10, 100))
        }
        disabled={level === 100}
        className="mt-4 rounded bg-blue-500 px-4 py-2 disabled:opacity-50"
      >
        Add 10
      </button>
    </div>
  )
}

export default LevelColors
