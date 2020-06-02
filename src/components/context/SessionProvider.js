import React, { useState } from 'react'
import PropTypes from 'prop-types'

const SessionStateContext = React.createContext(null)

const SessionProvider = props => {
  const defaultState = localStorage.getItem('session') || null
  const [session, setSession] = useState(defaultState)

  return (
    <SessionStateContext.Provider value={{ session, setSession }}>
      {props.children}
    </SessionStateContext.Provider>
  )
}

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { SessionProvider, SessionStateContext }
