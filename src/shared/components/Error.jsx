import { Button } from '@nextui-org/react'
import React from 'react'
import { BiX } from 'react-icons/bi'

const Error = ({message, isError}) => {
  return (
    <div>
    <Button endContent={<BiX/>} className='w-full' variant='flat' color={isError ? "danger" : "success"}>
      {message}
    </Button>
    </div>
  )
}

export default Error
