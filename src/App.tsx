import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { PrivateRoute } from 'react-auth-kit'

import Homepage from './views/Homepage'
import Game from './views/Game'
import Login from './views/Login'
import Rules from './views/Rules'
import Welcome from './views/Welcome'
import Rating from './views/Rating'

export default function App() {
  return (
    <Switch>
      <PrivateRoute path="/" component={Homepage} loginPath={'/login'} exact />
      <Route path="/game" component={Game} />
      <Route path="/login" component={Login} />
      <Route path="/rules" component={Rules} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/rating" component={Rating} />
    </Switch>
  )
}
