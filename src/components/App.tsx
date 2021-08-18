import useSupabaseUser from "../hooks/useSupabaseUser"
import SessionList from "./SessionList"
import SignIn from "./SignIn"

function App() {
  const user = useSupabaseUser()

  if (user == null) {
    return <SignIn />
  }

  return (
    <div className="App">
      <h1>Supabase Scrum Poker</h1>

      <SessionList />
    </div>
  )
}

export default App
