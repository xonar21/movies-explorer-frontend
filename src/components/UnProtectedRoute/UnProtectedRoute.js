import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const UnProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {() =>
      props.loggedIn !== true && !localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/movies" />
    }
  </Route>
)

export default UnProtectedRoute
