import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { withRouter } from 'react-router'
import useSession from '../hooks/useSession'
import ProfileForm from '../components/ProfileForm'
import styled from 'styled-components'
import axios from 'axios'

const ScTitle = styled.div.attrs({ className: 'title' })`
  text-align: center;
`

const ProfilePage = ({ history }) => {
  const sessionContext = useSession(history)
  const [serverResponse, setServerResponse] = useState(null)
  const getUserData = async () => {
    if (sessionContext.session === null) return
    const response = await axios.get('http://localhost:9000/user', {
      headers: { token: sessionContext.session.token },
    })
    const code = response.data.code
    const data = response.data.data
    console.log('Find User Response', data)
    if (code === 406) {
      localStorage.clear()
      sessionContext.setSession(null)
    } else {
      setServerResponse(data)
    }
  }
  useEffect(() => {
    if (serverResponse === null) getUserData()
  }, [serverResponse])
  if (serverResponse === null) return null
  else {
    return (
      <>
        <NavBar sessionContext={sessionContext} />
        <ScTitle>Profile</ScTitle>
        <ProfileForm
          history={history}
          sessionContext={sessionContext}
          uid={serverResponse.uid}
          firstName={serverResponse.first_name}
          lastName={serverResponse.last_name}
          gender={serverResponse.gender}
          birthDay={serverResponse.birthday}
          nickName={serverResponse.nickname}
        />
      </>
    )
  }
}

export default withRouter(ProfilePage)
