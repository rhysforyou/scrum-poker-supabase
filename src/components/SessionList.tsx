import useSessions from "../hooks/useSessions"

function SessionList() {
  const sessions = useSessions()

  return (
    <ul>
      {sessions.map((session) => (
        <li key={session.id}>{session.name}</li>
      ))}
    </ul>
  )
}

export default SessionList
