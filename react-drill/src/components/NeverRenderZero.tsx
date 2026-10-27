
import { useState } from "react"

function NeverRenderZero() {
  const [tasks, setTasks] = useState<string[]>([])

  return (
    <div className="p-6 text-slate-100">
      {/* tasks.length can be 0, and && renders that 0 in JSX. */}
      {tasks.length === 0 && (
        <p>No tasks yet - add one</p>
      )}

      <button
        onClick={() => setTasks([...tasks, "New task"])}
        className="mt-3 rounded bg-blue-500 px-4 py-2"
      >
        Add task
      </button>

      {tasks.length > 0 && (
        <p className="mt-3">Tasks: {tasks.length}</p>
      )}
    </div>
  )
}

export default NeverRenderZero
