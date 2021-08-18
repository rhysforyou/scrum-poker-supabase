import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import supabase from "../lib/supabase"

export default function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? null)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user
        setUser(currentUser ?? null)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [user])

  return user
}
