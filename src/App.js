import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { SessionProvider } from './components/context/SessionProvider'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CoursePage from './pages/CoursePage'
import ProfilePage from './pages/ProfilePage'
import 'bulma/css/bulma.min.css'

const App = props => (
  <SessionProvider>
    <BrowserRouter {...props}>
      <Switch>
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/course/:mode/:id" component={CoursePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="*" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </SessionProvider>
)

export default App
