
import { useState } from "react"

type Task = {
  id: string
  title: string
  done: boolean
}

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [text, setText] = useState("")
  const [filterText, setFilterText] = useState("")

  function addTask() {
    if (text.trim() === "") return

    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: text.trim(),
        done: false,
      },
    ])

    setText("")
  }

  function toggleTask(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    )
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const doneCount = tasks.filter((task) => task.done).length

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-slate-800 p-6 text-white shadow-lg">
      <h2 className="mb-5 text-2xl font-bold">My Task Manager</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          addTask()
        }}
        className="mb-4 flex gap-2"
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter a new task"
          className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-900 p-3 text-white placeholder:text-slate-400"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 font-semibold hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <input
        value={filterText}
        onChange={(event) => setFilterText(event.target.value)}
        placeholder="Search tasks..."
        className="mb-4 w-full rounded-lg border border-slate-600 bg-slate-900 p-3 text-white placeholder:text-slate-400"
      />

      {tasks.length === 0 && (
        <p className="py-4 text-slate-400">
          No tasks yet - add one
        </p>
      )}

      <ul className="space-y-3">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 rounded-lg bg-slate-700 p-3"
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="h-4 w-4 accent-blue-500"
            />

            <span
              className={`flex-1 break-words ${
                task.done
                  ? "text-slate-400 line-through"
                  : ""
              }`}
            >
              {task.title}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              className="rounded bg-red-500 px-3 py-1 text-sm hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && filteredTasks.length === 0 && (
        <p className="py-3 text-slate-400">
          No matching tasks found.
        </p>
      )}

      <p className="mt-5 border-t border-slate-600 pt-4 text-sm text-slate-300">
        {doneCount} of {tasks.length} done
      </p>
    </div>
  )
}

export default TaskManager
