import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../shared/api'
import { IoMdAddCircleOutline } from 'react-icons/io'
import styled from 'styled-components'

const FormContainer = styled.div`
    padding : 20px;
    display : flex;
    border-radius : 5px;
    background-color : #fff;  
`
const Button = styled.button`
    padding : 2px;
    display : flex;
    justify-content : center;
    align-items : center;
    border-radius : 50%;
    overflow : hidden;
    background-color : #703fe4;
    outline : none;
    border : none;
    cursor : pointer;
    transition : 0.5s

    &:hover{
        
    }
`

const AddVariation = ({refreshVaritions}) => {
   
    const {delicacyId} = useParams()
    const inputRef = useRef() // for focusing input after submit
    const[data, setData] = useState({
        'variationName' : '' ,
        'variationPrice' : '' ,
    })

    function handleChange(e){
        setData(
            {
                ...data,
                [e.target.name] : e.target.value
            }
        )
    }
    function clearForm (){
        setData({
            'variationName' : '' ,
            'variationPrice' : '' ,
        })
        if(inputRef.current){
            inputRef.current.focus()
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', data.variationName)
        formData.append('price', data.variationPrice)
        formData.append('delicacy', delicacyId)
        

        for (const pair of formData.entries()){
            console.log(`${pair[0]} : ${pair[1]}`)
        }

        try{
            const response = await api.post(`inventory/delicacies/${delicacyId}/variations`, formData)
            if(response.status === 201){
                console.log(response.data)
                refreshVaritions()
                clearForm()
                
            }
        }catch(error){
            console.error(error)
        }
    }
  return (
        <>
        
        <form onSubmit={handleSubmit}>
            <FormContainer>
                <div>
                    <input ref={inputRef} required type = 'text' name = 'variationName' value = {data.variationName} onChange = {handleChange}/>
                </div>
                <div>
                    <input type = 'number' required name = 'variationPrice' value = {data.variationPrice} onChange = {handleChange} />
                </div>
                <Button type = 'submit'>
                    <IoMdAddCircleOutline color='#fff' size={30}/>
                </Button>      
            </FormContainer>
        </form>

    </>
  )
}

export default AddVariation
