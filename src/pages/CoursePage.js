import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { withRouter } from 'react-router'
import useSession from '../hooks/useSession'
import CourseForm from '../components/CourseForm'
import axios from 'axios'

const CoursePage = ({ history, match }) => {
  const id = match.params.id
  const mode = match.params.mode
  const sessionContext = useSession(history)
  const [serverResponse, setServerResponse] = useState(null)
  const getUserData = async () => {
    if (id === 0) return
    if (sessionContext.session === null) return
    const response = await axios.get(`http://localhost:9000/course/${id}`, {
      headers: { token: sessionContext.session.token },
    })
    const code = response.data.code
    const data = response.data.data
    console.log('Find Course Response', data)
    if (code === 200) {
      setServerResponse(data)
    } else if (code === 406) {
      localStorage.clear()
      sessionContext.setSession(null)
    } else {
      history.push('/')
    }
  }
  useEffect(() => {
    if (serverResponse === null) getUserData()
  }, [serverResponse])
  if (serverResponse === null && id > 0) return null
  return (
    <>
      <NavBar sessionContext={sessionContext} />
      {/** Query Data **/}
      <CourseForm
        mode={mode}
        name={serverResponse.name}
        subject={serverResponse.subject}
        description={serverResponse.description}
        category={serverResponse.category}
        startTime={serverResponse.start_time}
        endTime={serverResponse.end_time}
        studentNum={serverResponse.student_number}
      />
    </>
  )
}

export default withRouter(CoursePage)
