import type { Student } from "./types"
import ProfileCard from "./components/ProfileCard"

const students: Student[] = [
  { id: "s1", name: "Aisha Khan", role: "Frontend Student", skills: ["HTML", "CSS", "JS"] },
  { id: "s2", name: "Rohit Verma", role: "Frontend Student", skills: ["HTML", "Tailwind"] },
  { id: "s3", name: "Sara Ali", role: "JS Learner", skills: ["JavaScript", "DOM"] },
  { id: "s4", name: "Dev Patel", role: "Frontend Student", skills: ["CSS", "React basics"] },
  { id: "s5", name: "Meera Nair", role: "Designer + Coder", skills: ["Figma", "HTML"] },
  { id: "s6", name: "Arjun Shah", role: "React Learner", skills: ["React", "TypeScript"]},
]

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100">
      <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
        {students.map((student) => (
          <ProfileCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  )
}

export default App