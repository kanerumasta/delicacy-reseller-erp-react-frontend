import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../../shared/api'
import { useNavigate } from 'react-router-dom'
import { Table, TableBody, TableCell, TableColumn, 
DropdownTrigger,DropdownItem,Dropdown,Button,DropdownMenu ,TableHeader, TableRow,  Chip, Spacer } from '@nextui-org/react'
import { LoadingContext } from '../../../shared/pages/Layout'
import LoadingLine from '../../../shared/components/LoadingLine'
import { BiChevronDown } from "react-icons/bi";
const AllRequisitions = () => {
    const [requisitions, setRequisitions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filteredItems, setFilteredItems] = useState([])
    const [selectedKeys, setSelectedKeys] = useState(new Set(["pending", "rejected", "approved"]))
    const navigate = useNavigate()

    useEffect(()=>{
       
        async function getRequisitions(){
            try {
                const response = await api.get('/requisition/requisitions')
                if(response.status === 200){
                   setRequisitions(response.data)
                    
                    
                }else{
                    console.log("nothing")
                    console.log(response)
                }
            } catch (error) {
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        }
        getRequisitions()
        
    },[])

useEffect(()=>{
    const filtered = requisitions.filter((item)=>{return selectedKeys.has(item.approval_status)})
    setFilteredItems(filtered)
},[requisitions,selectedKeys])
   



    const handleRowSelect = (e) => {
        
        navigate(`/requisitions/my-requisitions/${e}`)
    }

  return (
    <div>    
        {isLoading && <LoadingLine />}
        <span>Filter Status : </span>
        <Dropdown>
            <DropdownTrigger>
            
                <Button 
                isIconOnly
                variant="bordered" 
                className="capitalize"
                endContent = {<BiChevronDown/>}
             >    
                </Button>
              
            </DropdownTrigger>
            <DropdownMenu 
                aria-label="Multiple selection example"
                        variant="flat"
                closeOnSelect={false}
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
            >
                <DropdownItem key="pending">Pending</DropdownItem>
                <DropdownItem key="approved">Approved</DropdownItem>
                <DropdownItem key="rejected">Rejected</DropdownItem>
          
            </DropdownMenu>
        </Dropdown>
        <Spacer y={4} />

        <Table 
                    
            aria-label='all requisitions table'
            selectionMode='single'
            color='primary'
            onRowAction={handleRowSelect}
            
        >
            <TableHeader>
                <TableColumn>Requisition Code</TableColumn>
                <TableColumn>Date Requested</TableColumn>
                <TableColumn>Requester</TableColumn>
                <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No Requisitions Found" items={filteredItems}>
                {item => (
                    <TableRow className='hover-row' key={item.requisition_code}>
                        <TableCell>{item.requisition_code}</TableCell>
                        <TableCell>{item.created_at}</TableCell>
                        <TableCell>{item.requester.first_name}</TableCell>
                        <TableCell>
                            <Chip color="success" variant="dot" >{item.approval_status}</Chip>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>



    </div>

  )
}

export default AllRequisitions
