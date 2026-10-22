import type { Student } from "../types"
import Avatar from "./Avatar"
import Badge from "./Badge"

function IdCard({ student }: { student: Student }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-lg">
      <div className="mb-4 rounded-lg bg-indigo-600 px-3 py-3 text-center">
        <h2 className="font-bold text-white">
          Batch 2026 - React Beginners
        </h2>
        <p className="text-xs text-indigo-100">STUDENT ID CARD</p>
      </div>

      {student.id === "s1" && (
        <div className="mb-3">
          <Badge text="Class Rep" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <Avatar name={student.name} />

        <div>
          <h3 className="text-lg font-bold">{student.name}</h3>
          <p className="text-sm text-slate-400">
            Roll No: {student.rollNumber}
          </p>
          <p className="mt-1 text-sm text-slate-300">
            Valid Till: {student.validTill}
          </p>
        </div>
      </div>
    </div>
  )
}

export default IdCard