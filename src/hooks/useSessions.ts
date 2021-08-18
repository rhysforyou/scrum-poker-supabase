import { useEffect, useState } from "react"
import supabase from "../lib/supabase"

interface Session {
  id: string
  name: string
}

function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])

  const fetchSessions = async () => {
    const { data: sessions, error } = await supabase
      .from<Session>("sessions")
      .select()
    if (error) console.error(error)
    setSessions(sessions ?? [])
  }

  useEffect(() => {
    fetchSessions().catch(console.error)
  })

  return sessions
}

export default useSessions
