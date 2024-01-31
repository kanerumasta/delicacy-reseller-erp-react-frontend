import React, { useEffect, useState } from 'react'

import { api } from '../../../shared/api'
import Loading from '../../../shared/components/Loading'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button, Spacer } from '@nextui-org/react'
import { color } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import { formatDate, capitalize } from '../../../shared/utils'
import LoadingLine from '../../../shared/components/LoadingLine'



const MyRequisitions = () => {

  const [requisitions, setRequisitions] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await api.get("requisition/user-requisitions")
        
        if(response && response.status === 200) {
          console.log(response.data)
          setRequisitions(response.data)
          
        }
      } catch (error) {
        console.error(error)
      }finally{
        setIsLoading(false)
      }
     
    }
    fetchData()
  },[])
  
  const handleRowSelect = (e) => {
    console.log(typeof(e))
    navigate(`/requisitions/my-requisitions/${e}`)
  }

  return (
    <div>
        {isLoading && <LoadingLine />}
          <Button color="primary" onPress={()=>{navigate("/requisitions/add")}} endContent={<MdAdd size={30}/>}>Create</Button>
          
          <Spacer y={4}/>
          <Table
            aria-label='requisitions table'
            selectionMode='single'
            color='primary'
            onRowAction={handleRowSelect}
          >
              <TableHeader>
                  <TableColumn>CODE</TableColumn>
                  <TableColumn>DESCRIPTION</TableColumn>
                  <TableColumn>CREATED</TableColumn>
                  <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No Requisitions Found" items={requisitions}>
                  {(item)=>(
                    <TableRow className='hover-row' key={item.requisition_code}>
                        <TableCell>{item.requisition_code}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{formatDate(item.created_at)}</TableCell>
                        <TableCell>{item.approval_status}</TableCell>
                    </TableRow>
                  )}
              </TableBody>
          </Table>

    </div>
  )
}

export default MyRequisitions
