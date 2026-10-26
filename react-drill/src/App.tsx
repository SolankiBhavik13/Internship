
import { useState } from "react"

function App() {
  // Counter state
  const [count, setCount] = useState(0)

  // FAQ states
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  // Reset handler
  function handleReset() {
    setCount(0)
  }

  return (
    <div className="min-h-screen space-y-8 bg-slate-900 p-8 text-white">
      <h1 className="text-3xl font-bold">
        React Events Practice
      </h1>

      {/* 1. Event Object Drill */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          1. Event Object Drill
        </h2>

        <button
          onClick={(event) =>
            console.log(event.type, event.clientX)
          }
          className="rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white"
        >
          Click me
        </button>
      </section>

      {/* 2. Counter with Functional Updates */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          2. Counter
        </h2>

        <p className="text-lg">Count: {count}</p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              // Functional updates use the latest queued state.
              // Therefore, two updates increase the count by 2.
              setCount((c) => c + 1)
              setCount((c) => c + 1)
            }}
            className="rounded-lg bg-green-600 px-4 py-2"
          >
            +2
          </button>

          <button
            onClick={() =>
              setCount((c) => Math.max(0, c - 1))
            }
            className="rounded-lg bg-red-600 px-4 py-2"
          >
            -1
          </button>

          <button
            onClick={handleReset}
            className="rounded-lg bg-gray-600 px-4 py-2"
          >
            Reset
          </button>
        </div>
      </section>

      {/* 3. Collapsible FAQ Cards */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          3. Frequently Asked Questions
        </h2>

        {/* FAQ 1 */}
        <div className="rounded-xl bg-slate-800 p-4">
          <button
            onClick={() => setOpen1((o) => !o)}
            className="flex w-full items-center justify-between text-left font-semibold"
          >
            <span>What is React?</span>
            <span>{open1 ? "▲" : "▼"}</span>
          </button>

          {open1 && (
            <p className="mt-3 text-slate-300">
              React is a JavaScript library for building user interfaces.
            </p>
          )}
        </div>

        {/* FAQ 2 */}
        <div className="rounded-xl bg-slate-800 p-4">
          <button
            onClick={() => setOpen2((o) => !o)}
            className="flex w-full items-center justify-between text-left font-semibold"
          >
            <span>What is useState?</span>
            <span>{open2 ? "▲" : "▼"}</span>
          </button>

          {open2 && (
            <p className="mt-3 text-slate-300">
              useState is a React hook that lets components
              store and update state.
            </p>
          )}
        </div>

        {/* FAQ 3 */}
        <div className="rounded-xl bg-slate-800 p-4">
          <button
            onClick={() => setOpen3((o) => !o)}
            className="flex w-full items-center justify-between text-left font-semibold"
          >
            <span>What is TypeScript?</span>
            <span>{open3 ? "▲" : "▼"}</span>
          </button>

          {open3 && (
            <p className="mt-3 text-slate-300">
              TypeScript adds static types to JavaScript.
            </p>
          )}
        </div>
      </section>

      {/* 4. Passing a Function Reference */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          4. Reset Handler
        </h2>

        <p>Current count: {count}</p>

        <button
          onClick={handleReset}
          className="rounded-lg bg-purple-600 px-4 py-2"
        >
          Reset Count
        </button>
      </section>
    </div>
  )
}

export default App
