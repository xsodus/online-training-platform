import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import useSession from '../hooks/useSession'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import CourseItemLayout from '../components/CourseItemLayout'
import axios from 'axios'
import querystring from 'querystring'
import get from 'lodash/get'
import has from 'lodash/has'

const ScWrapper = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const ScTitle = styled.div.attrs({ className: 'title' })`
  text-align: center;
`

const ScTextField = styled.input.attrs({ className: 'input' })`
  width: 300px;
`

function submitSearchForm(e) {
  e.preventDefault()
  console.log(e)
}

const HomePage = ({ history }) => {
  const [serverResponse, setServerResponse] = useState(null)
  const courseList = has(serverResponse, 'message') ? null : serverResponse
  const errorMessage = get(serverResponse, 'message', null)
  const sessionContext = useSession(history)
  console.log('Test', courseList, errorMessage, serverResponse)
  return (
    <>
      <NavBar sessionContext={sessionContext} />
      <ScTitle>Find your course here...</ScTitle>
      <ScWrapper
        onSubmit={submitSearchForm}
        onSubmit={async event => {
          event.preventDefault()
          const input = {}
          const date = document.getElementById('date').value
          const keyword = document.getElementById('keyword').value
          if (date) input['date'] = date
          if (keyword) input['keyword'] = keyword

          console.log('Query Input', querystring.stringify(input))
          const response = await axios.get(
            'http://localhost:9000/course?' + querystring.stringify(input),
            { headers: { token: sessionContext.session.token } }
          )
          const code = response.data.code
          const data = response.data.data
          console.log('Find Course Response', data)
          if (code === 406) {
            localStorage.clear()
            sessionContext.setSession(null)
          } else {
            setServerResponse(data)
          }
        }}
      >
        <div className="control">
          <label className="label">Datetime</label>
          <div className="control">
            <ScTextField type="datetime-local" placeholder="Find a course" id="date" />
          </div>
        </div>
        <br />
        <div className="control">
          <label className="label">Course Name</label>
          <div className="control">
            <ScTextField type="text" placeholder="Find a course" id="keyword" />
          </div>
          <br />
          <div className="control">
            <input type="submit" className="button is-info" value="Search" />
          </div>
        </div>
        <br />
        {/** Query Data **/}
        {errorMessage && <label className="label">ERROR - {errorMessage} </label>}
        {courseList &&
          courseList.map(item => {
            console.log('Print')
            return (
              <CourseItemLayout
                id={item.id}
                name={item.name}
                category={item.category}
                description={item.description}
                subject={item.subject}
                startTime={item.start_time}
                endTime={item.end_time}
                studentNum={item.student_num}
                history={history}
              />
            )
          })}
      </ScWrapper>
    </>
  )
}

export default withRouter(HomePage)
