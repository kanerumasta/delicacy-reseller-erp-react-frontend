import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { api } from '../../shared/api'
import Cookies from "js-cookie";

const WholeScreen = styled.div`
  position         : fixed ;
  top              : 0 ;
  left             : 0 ;
  height           : 100vh;
  width            : 100vw ; 
  background-color : #3e4150;
  padding          : 20px ;
  display          : flex ;
  justify-content  : center ;
  align-items      : center ;

`
const FormContainer = styled.div`
  border        : 1px solid black;
  border-radius : 8px ;
  padding       : 10px ; 

`

const InputContainer = styled.div`
  display        : flex ;
  flex-direction : column ;
  padding        : 8px ;

`
const Input = styled.input `
  padding       : 10px   ;
  outline       : none  ;
  border-radius : 8px  ;
  outline       : none  ;
  border        : none  ;
  font-size     : 16px  ;

`

const Label = styled.span`
  font-size      : 16px ;
  text-transform : capitalize;

`



const Login = () => {
  const navigate = useNavigate()
  
  const [userData, setUserData] = useState({
    'username': '',
    'password': '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', userData.username)
    formData.append('password', userData.password)

    try {
      const { data } = await api.post('auth/login', formData)
  
      if(data){
        Cookies.set('accessToken', data.access)
        localStorage.setItem('refreshToken', data.refresh)
        api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`
        navigate('/')
      }else{console.log('error')}
     
    } catch (error) {
      alert('you are inactive')
    }

    
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <WholeScreen>
            <FormContainer>
                <InputContainer>
                  <Label>username</Label>
                  <Input required name='username' value={userData.username} onChange={(e) => { setUserData({ ...userData, [e.target.name]: e.target.value }) }} />
                </InputContainer>
           
                <InputContainer>
                  <Label>password</Label>
                  <Input required name='password' type='password' value={userData.password} onChange={(e) => { setUserData({ ...userData, [e.target.name]: e.target.value }) }} />
                </InputContainer> 
  
              <input type='submit' />
            </FormContainer>
        </WholeScreen>
      </form>
    </>
  )
}

export default Login
