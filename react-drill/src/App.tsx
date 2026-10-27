
import LoginSwitch from "./components/LoginSwitch"
import EmptyTaskList from "./components/EmptyTaskList"
import LevelColors from "./components/LevelColors"
import GuardClause from "./components/GuardClause"
import NeverRenderZero from "./components/NeverRenderZero"

function App() {
  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-2xl space-y-6">

        <section className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">01. Login Switch</h2>
          <LoginSwitch />
        </section>

        <section className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">02. Task List</h2>
          <EmptyTaskList />
        </section>

        <section className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">03. Level Colors</h2>
          <LevelColors />
        </section>

        <section className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">04. Guard Clause</h2>
          <GuardClause />
        </section>

        <section className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">05. Never Render Zero</h2>
          <NeverRenderZero />
        </section>

      </div>
    </main>
  )
}

export default App
