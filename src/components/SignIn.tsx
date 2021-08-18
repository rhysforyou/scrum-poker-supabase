import { FormEvent, useCallback, useState } from "react"
import supabase from "../lib/supabase"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      supabase.auth.signIn({ email, password })
    },
    [email, password]
  )

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input-email">Email</label>
      <br />
      <input
        type="email"
        name="email"
        id="input-email"
        value={email}
        onChange={(e) => {
          e.preventDefault()
          setEmail(e.target.value)
        }}
      />
      <br />
      <label htmlFor="input-password">Password</label>
      <br />
      <input
        type="password"
        name="password"
        id="input-password"
        value={password}
        onChange={(e) => {
          e.preventDefault()
          setPassword(e.target.value)
        }}
      />
      <br />
      <input type="submit" value="Log In" />
    </form>
  )
}

export default SignIn
