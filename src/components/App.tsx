import useSupabaseUser from "../hooks/useSupabaseUser"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import SessionList from "./SessionList"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

function App() {
  const { user, isLoading } = useSupabaseUser()

  return (
    <Router>
      <div className="App">
        <h1>Supabase Scrum Poker</h1>

        {!isLoading && (
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <PrivateRoute user={user} path="/sessions">
              <SessionList />
            </PrivateRoute>
            <Route path="/">
              <Redirect to="/sessions" />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  )
}

export default App
