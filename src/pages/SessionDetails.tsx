import { useParams } from "react-router-dom"
import useSession from "../hooks/useSession"

interface SessionDetailsParams {
  sessionId: string
}

function SessionDetails() {
  let { sessionId } = useParams<SessionDetailsParams>()
  let session = useSession(sessionId)

  if (session == null) {
    return <h1>Loading…</h1>
  }

  return (
    <div>
      <h1>{session.name}</h1>
      <h2>Details</h2>
    </div>
  )
}

export default SessionDetails
