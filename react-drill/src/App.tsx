
import type { Student } from "./types"
import IdCard from "./components/IdCard"

const students: Student[] = [
  { id: "s1", name: "Aisha Khan", rollNumber: "RB001", validTill: 2026 },
  { id: "s2", name: "Rohit Verma", rollNumber: "RB002", validTill: 2026 },
  { id: "s3", name: "Sara Ali", rollNumber: "RB003", validTill: 2027 },
  { id: "s4", name: "Dev Patel", rollNumber: "RB004", validTill: 2027 },
  { id: "s5", name: "Meera Nair", rollNumber: "RB005", validTill: 2027 },
  { id: "s6", name: "Arjun Shah", rollNumber: "RB006", validTill: 2028 },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100 sm:p-8">
      <header className="mx-auto mb-8 max-w-6xl">
        <h1 className="text-3xl font-bold">
          Student ID Card Gallery
        </h1>

        <p className="mt-2 text-slate-400">
          {students.length} students enrolled
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <IdCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  )
}

export default App
