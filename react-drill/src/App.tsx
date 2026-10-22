
type Student = {
  name: string
  role: string
  skills: string[]
}

const student: Student = {
  name: "Aisha Khan",
  role: "Frontend Student",
  skills: ["HTML", "CSS", "JavaScript"],
}

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100">
      <div className="mx-auto max-w-sm rounded-2xl bg-slate-800 p-6 shadow-lg">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-xl font-bold">
          {student.name.charAt(0)}
        </div>

        <h2 className="mt-4 text-2xl font-bold">
          {student.name.toUpperCase()}
        </h2>

        <p className="text-slate-400">{student.role}</p>

        <p className="mt-3 text-sm text-indigo-300">
          {student.skills.join(" - ")}
        </p>

        <p className="mt-3">
          Current year: {new Date().getFullYear()}
        </p>

        <p>
          Math result: {40 + 2}
        </p>
      </div>
    </div>
  )
}

export default App
