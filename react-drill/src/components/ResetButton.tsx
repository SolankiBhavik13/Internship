
import { useState } from "react"

function ResetButton() {
  const [count, setCount] = useState(5)

  function handleReset() {
    setCount(0)
  }

  return (
    <div className="space-y-3">
      <p className="text-xl font-bold">Count: {count}</p>

      <button
        onClick={handleReset}
        className="rounded-lg bg-gray-600 px-4 py-2 text-white"
      >
        Reset
      </button>
    </div>
  )
}

export default ResetButton
