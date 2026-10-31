import { useEffect, useState } from "react"

function Clock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date())
      console.log("Clock is running...")
    }, 1000)

    return () => {
      clearInterval(id)
      console.log("Clock stopped!")
    }
  }, [])

  return (
    <div className="p-5 text-center">
      <h2 className="mb-3 text-xl font-bold">
        Live Clock
      </h2>

      <p className="text-3xl font-bold text-green-500">
        {now.toLocaleTimeString()}
      </p>
    </div>
  )
}

export default Clock