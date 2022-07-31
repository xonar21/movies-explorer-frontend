import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...props }) => (
   <Route>
      {() =>
         props.loggedIn === true ? (
            <Component {...props} />
         ) : localStorage.getItem('token') ? (
            <Component {...props} />
         ) : (
            <Redirect to="/" />
         )
      }
   </Route>
)

export default ProtectedRoute