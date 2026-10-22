
import type { Student } from "./types"
import Card from "./components/Card"
import Badge from "./components/Badge"
import Avatar from "./components/Avatar"

const student: Student = {
  id: "1",
  name: "Aisha Khan",
  role: "Frontend Student",
  skills: ["HTML", "CSS", "JavaScript"],
}

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100">
      <Card>
        <div className="flex items-center gap-4">
          <Avatar name={student.name} />
          <div>
            <h2 className="text-2xl font-bold">
              {student.name.toUpperCase()}
            </h2>
            <p className="text-slate-400">{student.role}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
  {student.skills.map((skill: string) => (
  <Badge key={skill} text={skill} />
))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold">My Projects</h2>
        <p>Project 1: Student Profile</p>
        <p>Project 2: React Practice</p>
      </Card>
    </div>
  )
}

export default App
