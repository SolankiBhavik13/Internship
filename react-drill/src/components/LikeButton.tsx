
import { useState } from "react"

function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className="rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white"
    >
      Like ({likes})
    </button>
  )
}

export default LikeButton
