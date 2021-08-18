import React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"

interface PrivateRouteProps extends RouteProps {
  user?: React.ReactNode
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, user, ...rest }: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
