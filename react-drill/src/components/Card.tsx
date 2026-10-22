
import type { ReactNode } from "react"

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-slate-800 p-6 shadow-lg">
      {children}
    </div>
  )
}

export default Card
