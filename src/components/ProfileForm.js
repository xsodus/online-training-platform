import React, { useState } from 'react'
import styled from 'styled-components'
import useSession from '../hooks/useSession'
import get from 'lodash/get'
import axios from 'axios'

const ScForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 0px 10px 0px 10px;
  flex-direction: column;
`

const ProfileForm = ({ history, ...restProps }) => {
  const sessionContext = useSession(history)
  const [serverResponse, setServerResponse] = useState(null)
  const message = get(serverResponse, 'message', null)
  const [firstName, setFirstName] = useState(restProps.firstName)
  const [lastName, setLastName] = useState(restProps.lastName)
  const [nickName, setNickName] = useState(restProps.nickName)
  const [birthDay, setBirthDay] = useState(restProps.birthDay.split('T')[0])
  const [gender, setGender] = useState(restProps.gender)

  return (
    <ScForm
      onSubmit={async event => {
        event.preventDefault()
        console.log(event.target.elements, 'elements')
        if (sessionContext.session === null) return
        const input = {
          first_name: firstName,
          last_name: lastName,
          nickname: nickName,
          birthday: birthDay,
          gender,
        }
        console.log(input)
        const response = await axios.post('http://localhost:9000/user', input, {
          headers: { token: sessionContext.session.token },
        })
        const code = response.data.code
        const data = response.data.data
        console.log('Update User Response', data)
        if (code === 200) {
          setServerResponse({ message: 'Success' })
        } else if (code === 406) {
          localStorage.clear()
          sessionContext.setSession(null)
        } else {
          setServerResponse({ message: 'ERROR - Could not update profile. Please check your data' })
        }
      }}
    >
      {message && <label className="label">{message}</label>}
      <div className="field">
        <label className="label">First Name:</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={firstName}
            name="firstName"
            onChange={event => {
              setFirstName(event.target.value)
            }}
          />
        </div>
        <label className="label">Last Name:</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={lastName}
            name="lastName"
            onChange={event => {
              setLastName(event.target.value)
            }}
          />
        </div>
        <label className="label">Nick Name:</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={nickName}
            name="nickName"
            onChange={event => {
              setNickName(event.target.value)
            }}
          />
        </div>
        <label className="label">Birth Day:</label>
        <div className="control">
          <input
            className="input"
            type="date"
            value={birthDay}
            name="birthDay"
            onChange={event => {
              setBirthDay(event.target.value)
            }}
          />
        </div>
        <label className="label">Gender:</label>
        <div className="control">
          <label className="radio">
            {gender === 'Male' ? (
              <input
                type="radio"
                name="gender"
                checked
                onChange={event => {
                  setGender(event.target.value)
                }}
              />
            ) : (
              <input
                type="radio"
                name="gender"
                onChange={event => {
                  setGender(event.target.value)
                }}
              />
            )}
            Male
          </label>
          <label className="radio">
            {gender === 'Female' ? (
              <input
                type="radio"
                name="gender"
                checked
                onChange={event => {
                  setGender(event.target.value)
                }}
              />
            ) : (
              <input
                type="radio"
                name="gender"
                onChange={event => {
                  setGender(event.target.value)
                }}
              />
            )}
            Female
          </label>
        </div>
        <br />
        <div className="control">
          <input type="submit" className="button is-info" value="Submit" />
        </div>
      </div>
    </ScForm>
  )
}

export default ProfileForm
