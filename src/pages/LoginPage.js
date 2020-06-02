import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { SessionStateContext } from '../components/context/SessionProvider'
import { withRouter } from 'react-router'
import axios from 'axios'

const ScForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0px 10px 0px 10px;
  flex-direction: column;
`

const ScField = styled.div.attrs({ className: 'field' })`
  display: flex;
  width: 100%;
  justify-content: center;
`

const ScTitle = styled.div.attrs({ className: 'title' })`
  text-align: center;
`

async function submitSearchForm(event, sessionContext, setErrorMessageFunc) {
  event.preventDefault()
  const input = {}
  input['username'] = document.getElementById('username').value
  input['password'] = document.getElementById('password').value
  const response = await axios.post('http://localhost:9000/login', input)
  const code = response.data.code
  const data = response.data.data
  console.log('Login Response', data)
  if (code === 200) {
    localStorage.setItem('session', JSON.stringify(data))
    sessionContext.setSession(data)
  } else {
    setErrorMessageFunc(data.message)
  }
}

const LoginPage = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const sessionContext = useContext(SessionStateContext)
  if (sessionContext.session !== null) history.push('/')

  return (
    <ScForm onSubmit={e => submitSearchForm(e, sessionContext, setErrorMessage)}>
      <ScTitle>Online Training Platform</ScTitle>
      {errorMessage && <label className="label">ERROR - {errorMessage} </label>}
      <ScField>
        <div className="control">
          <label className="label">Username</label>
          <input className="input" type="text" placeholder="" id="username" />
        </div>
      </ScField>
      <ScField>
        <div className="control">
          <label className="label">Password</label>
          <input className="input" type="password" placeholder="" id="password" />
        </div>
      </ScField>
      <div className="buttons">
        <button className="is-primary is-rounded is-fullwidth button" tabIndex="0">
          Login
        </button>
      </div>
    </ScForm>
  )
}

export default withRouter(LoginPage)
