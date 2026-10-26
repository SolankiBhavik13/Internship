
import { useState } from "react"

function NameSwapper() {
  const [name, setName] = useState("Aisha")

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Name: {name}
      </h2>

      <button
        onClick={() =>
          setName(name === "Aisha" ? "Rohit" : "Aisha")
        }
        className="rounded-lg bg-purple-500 px-4 py-2 text-white"
      >
        Switch Name
      </button>
    </div>
  )
}

export default NameSwapper
