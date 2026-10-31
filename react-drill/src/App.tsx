import Clock from "./components/Clock"
import TitleFollower from "./components/TitleFollower"
import ClockToggle from "./components/ClockToggle"

function App() {
  return (
    <div className="min-h-screen space-y-8 bg-slate-900 p-8 text-white">

      <Clock />

      <TitleFollower />

      <ClockToggle />

    </div>
  )
}

export default App