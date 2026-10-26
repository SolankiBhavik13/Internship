
function ClickPosition() {
  return (
    <button
      onClick={(event) =>
        console.log(event.type, event.clientX)
      }
      className="rounded-lg bg-indigo-500 px-4 py-2 text-white"
    >
      Click me
    </button>
  )
}

export default ClickPosition
