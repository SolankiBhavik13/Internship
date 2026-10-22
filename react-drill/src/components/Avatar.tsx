
type AvatarProps = {
  name: string
}

function Avatar({ name }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-xl font-bold text-white">
      {initials}
    </div>
  )
}

export default Avatar
