import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';
import StyledForm from '../../styled/styled-form'
import StyledInput from '../../styled/styled-input'
import StyledButton from '../../styled/styled-button'




const NewFeeback = ({ token }) => {
  console.log(token)
  const { id } = useParams()
  console.log(id)
  const history = useHistory()
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [grade, setGrade] = useState('')

  const handleName = event => {
    setName(event.target.value)
  }

  
  const handleComment = event => {
    setComment(event.target.value)
  }

  
  const handleGrade = event => {
    setGrade(event.target.value)
  }

  const onFinish = async (event) => {
    event.preventDefault()
    try{
      await axios({
        method:'POST',
        url:`https://ka-users-api.herokuapp.com/users/${id}/feedbacks`,
        headers:{
          Authorization: token,
          "Content-Type":"application/json"
        },
        data:{
          feedback:{
            name:name,
            comment: comment,
            grade: grade
          }
        } 
      })
      history.push(`/users/feedbacks/${id}`)
    }
    catch(error){
      console.log(error)
    }
  
  }

 
  return(
    <Container>
      <StyledForm handleSubmit={onFinish}>
        <StyledInput 
          label='Name'
          name='name'
          required={false}
          value={name}
          handleChange={handleName}
          width='350px'
          height='45px'
        />
        <StyledInput
          label='Comment'
          name='comment'
          required={false}
          value={comment}
          handleChange={handleComment}
          width='350px'
          height='45px'
        />
        <StyledInput 
          label='Grade'
          name='grade'
          required={false}
          value={grade}
          handleChange={handleGrade}
          width='350px'
          height='45px'
        />
        <StyledButton
          buttonName='Submit'
          width='245px'
          height='50px'
        />
      </StyledForm>
    </Container>
  )
}

export default NewFeeback


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .title {
    width: 90%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin: 1rem 5rem;
    font-size: 4rem;
  }
`