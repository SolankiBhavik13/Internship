
import { useState } from "react"

function EmptyTaskList() {
  const [tasks, setTasks] = useState<string[]>([])
  const [task, setTask] = useState("")

  function addTask() {
    if (task.trim() === "") return

    setTasks([...tasks, task])
    setTask("")
  }

  return (
    <div className="p-6 text-slate-100">
      <input
        value={task}
        onChange={(event) => setTask(event.target.value)}
        placeholder="Enter a task"
        className="rounded p-2 text-black"
      />

      <button
        onClick={addTask}
        className="ml-2 rounded bg-blue-500 px-4 py-2"
      >
        Add task
      </button>

      {tasks.length === 0 && (
        <p className="mt-4 text-slate-400">
          No tasks yet - add one
        </p>
      )}

      <ul className="mt-4 list-disc pl-6">
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  )
}

export default EmptyTaskList
