
import { useEffect, useState } from "react"

type Post = {
  id: number
  title: string
  body: string
  userId: number
}

type Author = {
  id: number
  name: string
}

function Spinner() {
  return (
    <div className="mx-auto mt-16 h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-indigo-400" />
  )
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [author, setAuthor] = useState<Author | null>(null)
  const [authorLoading, setAuthorLoading] = useState(false)

  // Fetch English posts
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            headers: {
              "Accept-Language": "en",
            },
          }
        )

        if (!response.ok) {
          throw new Error("Server said " + response.status)
        }

        const data = (await response.json()) as Post[]
        setPosts(data)
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Could not load posts"
        )
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  // Search by title
  const q = search.trim().toLowerCase()

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(q)
  )

  // Find selected post
  const selected = posts.find((p) => p.id === selectedId)

  // Fetch selected post author
  useEffect(() => {
    let ignore = false

    if (!selected) {
      setAuthor(null)
      setAuthorLoading(false)
      return
    }

    setAuthor(null)
    setAuthorLoading(true)

    async function loadAuthor() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${selected.userId}`
        )

        if (!response.ok) {
          throw new Error("Could not load author")
        }

        const data = (await response.json()) as Author

        if (!ignore) {
          setAuthor(data)
        }
      } catch {
        if (!ignore) {
          setAuthor(null)
        }
      } finally {
        if (!ignore) {
          setAuthorLoading(false)
        }
      }
    }

    loadAuthor()

    return () => {
      ignore = true
    }
  }, [selected?.userId])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-6 text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">
          Posts Explorer
        </h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts by title..."
          className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left column */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              All Posts ({filtered.length})
            </h2>

            {filtered.length === 0 ? (
              <p className="rounded-lg bg-slate-800 p-5 text-slate-400">
                No posts match your search.
              </p>
            ) : (
              <div className="space-y-3">
                {filtered.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedId(post.id)}
                    className={`w-full rounded-lg p-4 text-left transition ${
                      selectedId === post.id
                        ? "border border-indigo-400 bg-indigo-900"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    <h3 className="font-semibold">{post.title}</h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Post ID: {post.id}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Right column */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Post Details
            </h2>

            {!selected ? (
              <div className="rounded-lg bg-slate-800 p-6 text-slate-400">
                Pick a post to read it.
              </div>
            ) : (
              <div className="rounded-xl bg-slate-800 p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">
                    {selected.title}
                  </h3>

                  <span className="shrink-0 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold">
                    Post #{selected.id}
                  </span>
                </div>

                <p className="leading-7 text-slate-300">
                  {selected.body}
                </p>

                <div className="mt-6 border-t border-slate-700 pt-4">
                  <h4 className="mb-2 font-semibold text-indigo-400">
                    Author
                  </h4>

                  {authorLoading ? (
                    <p className="text-sm text-slate-400">
                      Loading author...
                    </p>
                  ) : author ? (
                    <p className="text-slate-200">{author.name}</p>
                  ) : (
                    <p className="text-slate-400">
                      Author ID: {selected.userId}
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
