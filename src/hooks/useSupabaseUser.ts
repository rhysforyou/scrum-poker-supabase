import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import supabase from "../lib/supabase"

export default function useSupabaseUser() {
  const [user, setUser] = useState<User | undefined>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? undefined)
    setLoading(false)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user
        setUser(currentUser ?? undefined)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [user])

  return { user, isLoading }
}
