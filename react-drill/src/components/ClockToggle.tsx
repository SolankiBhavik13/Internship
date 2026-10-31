import { useState } from "react"
import Clock from "./Clock"

function ClockToggle() {
  const [showClock, setShowClock] = useState(true)

  return (
    <div className="p-5 text-center">
      <h2 className="mb-4 text-xl font-bold">
        Clock Toggle
      </h2>

      <button
        onClick={() => setShowClock(!showClock)}
        className="rounded-lg bg-blue-500 px-5 py-2 text-white"
      >
        {showClock ? "Hide Clock" : "Show Clock"}
      </button>

      {showClock && <Clock />}
    </div>
  )
}

export default ClockToggle