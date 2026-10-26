
import LikeButton from "./components/LikeButton"
import Counter from "./components/Counter"
import NameSwapper from "./components/NameSwapper"

function App() {
  return (
    <div className="min-h-screen space-y-8 bg-slate-900 p-8 text-white">
      <h1 className="text-3xl font-bold">
        React useState Practice
      </h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          1. Like Button
        </h2>
        <LikeButton />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          2. Counter
        </h2>
        <Counter />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          3. Name Swapper
        </h2>
        <NameSwapper />
      </section>
    </div>
  )
}

export default App
