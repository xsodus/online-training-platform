import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'

const ScNavBar = styled.nav.attrs({
  className: 'level',
})`
  border-bottom: 1px solid grey;
`

const NavBar = ({ sessionContext }) => {
  if (sessionContext === null) return null
  const { session, setSession } = sessionContext
  return (
    <ScNavBar>
      <p className="level-item has-text-centered">
        <a className="link is-info" href="/">
          Home
        </a>
      </p>
      {session.user_type === 'instructor' && (
        <>
          <p className="level-item has-text-centered">
            <a className="link is-info" href="/course/write/0">
              Add Course
            </a>
          </p>
        </>
      )}
      <p className="level-item has-text-centered">
        <a className="link is-info" href="/profile">
          Profile
        </a>
      </p>
      <p className="level-item heading">
        Hello! {session.username} <br />
        (You're a {session.user_type === 'instructor' ? 'instructor' : 'student'})
        <br />
        <a
          className="link is-info"
          href="/login"
          onClick={() => {
            localStorage.clear()
            setSession(null)
          }}
        >
          Logout
        </a>
      </p>
    </ScNavBar>
  )
}

export default withRouter(NavBar)
