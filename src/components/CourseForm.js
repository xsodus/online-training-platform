import React, { useState } from 'react'
import styled from 'styled-components'
import useSession from '../hooks/useSession'
import axios from 'axios'

const ScForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 0px 10px 0px 10px;
  flex-direction: column;
`

const CourseForm = ({ history, mode, ...restProps }) => {
  const sessionContext = useSession(history)
  const [message, setMessage] = useState('')
  const [name, setName] = useState(restProps.name)
  const [category, setCategory] = useState(restProps.category)
  const [description, setDescription] = useState(restProps.description)
  const [startTime, setStartTime] = useState(restProps.startTime)
  const [endTime, setEndTime] = useState(restProps.endTime)
  const [studentNum] = useState(restProps.studentNum)
  const [subject, setSubject] = useState(restProps.subject)
  return (
    <ScForm
      onSubmit={async event => {
        event.preventDefault()
        console.log(event.target.elements, 'elements')
        if (sessionContext.session === null) return
        const input = {
          name,
          category,
          description,
          subject,
          start_time: startTime,
          endTime,
        }
        console.log(input)
        const response = await axios.post('http://localhost:9000/course', input, {
          headers: { token: sessionContext.session.token },
        })
        const code = response.data.code
        const data = response.data.data
        console.log('Update User Response', data)
        if (code === 200) {
          setMessage('Success')
        } else if (code === 406) {
          localStorage.clear()
          sessionContext.setSession(null)
        } else {
          setMessage('ERROR - Could not update profile. Please check your data')
        }
      }}
    >
      {message && <label className="label">{message}</label>}
      <div className="field">
        <label className="label">Name:</label>
        <div className="control">
          {mode === 'read' ? (
            <label className="label">{name}</label>
          ) : (
            <input
              className="input"
              type="text"
              value={name}
              name="name"
              onChange={event => {
                setName(event.target.value)
              }}
            />
          )}
        </div>
        <label className="label">Description:</label>
        <div className="control">
          {mode === 'read' ? (
            <label className="label">{description}</label>
          ) : (
            <input
              className="input"
              type="text"
              value={description}
              name="description"
              onChange={event => {
                setDescription(event.target.value)
              }}
            />
          )}
        </div>
        <label className="label">Category:</label>
        <div className="control">
          {mode === 'read' ? (
            <label className="label">{category}</label>
          ) : (
            <input
              className="input"
              type="text"
              value={category}
              name="category"
              onChange={event => {
                setCategory(event.target.value)
              }}
            />
          )}
        </div>
        <label className="label">Subject:</label>
        <div className="control">
          {mode === 'read' ? (
            <label className="label">{subject}</label>
          ) : (
            <input
              className="input"
              type="text"
              value={subject}
              name="subject"
              onChange={event => {
                setSubject(event.target.value)
              }}
            />
          )}
        </div>
        <label className="label">Start Time:</label>
        <div className="control">
          {mode === 'read' ? (
            <label className="label">{startTime}</label>
          ) : (
            <input
              className="input"
              type="datetime-local"
              value={startTime}
              name="startTime"
              onChange={event => {
                setStartTime(event.target.value)
              }}
            />
          )}
        </div>
        <label className="label">End Time:</label>
        <div className="control">
          {mode === 'read' ? (
            <label className="label">{endTime}</label>
          ) : (
            <input
              className="input"
              type="datetime-local"
              value={endTime}
              name="endTime"
              onChange={event => {
                setEndTime(event.target.value)
              }}
            />
          )}
        </div>
        {mode === 'read' && (
          <>
            <label className="label">Student Number:</label>
            <div className="control">
              <label className="label">{studentNum}</label>
            </div>
          </>
        )}
        {mode === 'write' && (
          <>
            <br />
            <div className="control">
              <input type="submit" className="button is-info" value="Submit" />
            </div>
          </>
        )}
      </div>
    </ScForm>
  )
}

export default CourseForm
