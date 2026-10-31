import { useEffect, useState } from "react"

function TitleFollower() {
  const [text, setText] = useState("")

  useEffect(() => {
    document.title = text === "" ? "React Drill" : text
  }, [text])

  return (
    <div className="p-5">
      <h2 className="mb-3 text-xl font-bold">
        Title Follower
      </h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        className="rounded border p-2 text-black"
      />

      <p className="mt-3 text-gray-300">
        Your title: {text}
      </p>
    </div>
  )
}

export default TitleFollower