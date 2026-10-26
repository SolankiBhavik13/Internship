
import { useState } from "react"

function DoubleIncrement() {
  const [count, setCount] = useState(0)

  function handleClick() {
    // Functional updates use the latest queued value.
    // Two updates therefore increase the count by 2.
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  return (
    <div className="space-y-3">
      <p className="text-xl font-bold">Count: {count}</p>

      <button
        onClick={handleClick}
        className="rounded-lg bg-green-600 px-4 py-2 text-white"
      >
        Add 2
      </button>
    </div>
  )
}

export default DoubleIncrement
