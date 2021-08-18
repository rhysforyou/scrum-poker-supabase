import { Link } from "react-router-dom"
import useSessions from "../hooks/useSessions"

function SessionList() {
  const sessions = useSessions()

  return (
    <ul>
      {sessions.map((session) => (
        <li key={session.id}>
          <Link to={`/sessions/${session.id}`}>{session.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default SessionList
