import useSupabaseUser from "./hooks/useSupabaseUser"
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import SessionList from "./pages/SessionList"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function App() {
  const { user, isLoading } = useSupabaseUser()

  return (
    <Router>
      <div className="px-4 py-6">
        <Link to="/" className="hover:text-indigo-500">
          <h1 className="mb-6 text-xl font-bold">Supabase Scrum Poker</h1>
        </Link>

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
