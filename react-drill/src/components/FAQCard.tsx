
import { useState } from "react"

function FAQCard() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl bg-slate-800 p-4 text-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between font-semibold"
      >
        <span>What is React?</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <p className="mt-3 text-slate-300">
          React is a JavaScript library for building user interfaces.
        </p>
      )}
    </div>
  )
}

export default FAQCard
