import React from 'react'
import styled from 'styled-components'

const ScWrapper = styled.div`
  border-bottom: 1px solid grey;
  &:hover {
    background-color: yellow;
  }
  width: 100%;
`

const CourseItemLayout = ({
  id,
  name,
  category,
  description,
  subject,
  startTime,
  endTime,
  studentNum,
  history,
}) => {
  return (
    <ScWrapper
      onClick={() => {
        history.push(`/course/read/${id}`)
      }}
    >
      <h1>{name}</h1>
      <p>Subject:{subject}</p>
      <p>Category:{category}</p>
      <p>Student Number:{studentNum}</p>
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime}</p>
      <p>Description: {description}</p>
    </ScWrapper>
  )
}

export default CourseItemLayout
