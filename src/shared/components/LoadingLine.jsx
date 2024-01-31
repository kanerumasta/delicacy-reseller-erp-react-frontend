import { Progress } from '@nextui-org/react'
import React from 'react'
import styled from 'styled-components'

const BlurScreen = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    width :  100%;
    height : 100%;
    background-color : #e9e9e9;
    z-index : 100;
`

const LoadingLine = () => {
  return (
    <BlurScreen>
    <Progress 
        isIndeterminate
        size="sm"
        aria-label="Loading..."
        className="w-full"/>
    </BlurScreen>
  )
}

export default LoadingLine
