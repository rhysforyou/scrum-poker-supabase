import { useEffect, useState } from "react"
import supabase from "../lib/supabase"

interface Session {
  id: string
  name: string
}

function useSession(id: string) {
  const [session, setSession] = useState<Session | undefined>()

  useEffect(() => {
    const fetchSessions = async () => {
      const { data: sessions, error } = await supabase
        .from<Session>("sessions")
        .select("id, name")
        .eq("id", id)
        .limit(1)
      if (error) console.error(error)
      if (sessions && sessions.length > 0) {
        setSession(sessions[0])
      } else {
        setSession(undefined)
      }
    }

    fetchSessions().catch(console.error)
  }, [id])

  return session
}

export default useSession
