import React, { useState } from 'react'
import styled from 'styled-components'
import { api } from '../../shared/api'

const FormContainer = styled.div`
    padding : 20px ;
    border-radius : 10px ;
    display : flex ;
    flex-direction : column ;
`

const Input = styled.input`
    border-radius : 5px ;
    padding : 2px ;
    outline : none ;
    &:focus{
        outline : 1px solid blue ;
    }
`

const Register = () => {

    //STATE
    const [data,setData] = useState({
        'firstName' : '' ,
        'lastName'  : '' ,
        'username'  : '' ,
        'password'  : '' , 
        'password2' : '' ,

    })

    function handleChange(e){
        setData(
            {
                ...data,
                [e.target.name] : e.target.value
            }
        )
    } 

    async function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append('first_name' , data.firstName)
        formData.append('last_name', data.lastName)
        formData.append('username' , data.username)
        formData.append('password' , data.password)
        formData.append('password2' , data.password2)

        try {
           
            const response = await api.post('auth/register', formData);
    
            if (response.status === 201) { 

                console.log('Registration successful!');

            } else {

                console.error('Unexpected response status:', response.status);

            }
        } catch (error) {

            if (error.response) {

                console.error('Server responded with an error:', error.response.data);

            } else if (error.request) {

                console.error('No response received from the server');

            } else {

                console.error('Error setting up the request:', error.message);
            }
        }
    }
    

  return (
    <FormContainer>
        <form onSubmit={handleSubmit}>
            <div>
                
                <Input autoComplete='off' type = 'text' name = 'firstName' id = 'firstName' placeholder = 'Enter your firstname' required value={data.firstName} onChange={handleChange}/>
            </div>
            <div>
                
                <Input autoComplete='off' type = 'text' name = 'lastName' id = 'lastName' placeholder = 'Enter your lastname' required value = {data.lastName} onChange={handleChange}/>
            </div>
            <div>
                
                <Input autoComplete='off' type = 'text' name = 'username' id = 'username' placeholder = 'Enter username' required value = {data.username} onChange={handleChange}/>
            </div>
            <div>
                
                <Input type = 'password' name = 'password' id = 'password' placeholder = 'Enter a strong password' required value = {data.password} onChange={handleChange}/>
            </div>
            <div>
                
                <Input type = 'password' name = 'password2' id = 'password2' placeholder = 'Confirm your password' required value = {data.password2} onChange={handleChange}/>
            </div>
            <input type='submit'/>
            

           
        </form>
    </FormContainer>
  )
}

export default Register
