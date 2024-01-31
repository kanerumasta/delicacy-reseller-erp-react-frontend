import React from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'
export const Div = styled.div`
    height:100%;
    width:100%;
    background:transparent;
    display:flex;
    flex-direction : column;
    justify-content:center;
    align-items:center;
    z-index:10;
`

const Loading = () => {
  return (
    <Div>
       <ReactLoading width={200} type='bubbles' color='blue' />
    </Div>
  )
}

export default Loading
