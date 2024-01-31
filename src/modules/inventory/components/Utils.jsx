import React from 'react'
import { Card, CardFooter, Image, Table, TableHeader, 
        TableBody, Button, Tooltip, TableColumn, TableCell,
        Spinner, TableRow } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { MdDelete, MdEdit } from 'react-icons/md'

export const DelicacyCard = ({item}) => {
    const navigate = useNavigate()
  return (
    <Card
    className="card"
    shadow="sm"
    key={item.id}
    isPressable
    onPress={() => navigate(`/inventory/delicacies/${item.id}`)}
  >
    
      <Image
        removeWrapper
        shadow="sm"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={item.image_url}
      />
    
    <CardFooter color="secondary" className="absolute bg-white/50 text-zinc-100 border-t-1 border-zinc-100/50 z-10 flex-col items-start">
      <span className="text-lg text-left">{item.name}</span>
      <span className="text-xs text-left opacity-50">{item.description}</span>
    </CardFooter>
  </Card>
  )
}

export const VariationsTable = ({variations = [], handleEditButtonClick}) => {
    return(
        <Table
            aria-label="This is variation table"
        >
            <TableHeader>
                <TableColumn key="name">Name</TableColumn>
                <TableColumn key="price">Price</TableColumn>
                <TableColumn key="action">Action</TableColumn>
            </TableHeader>
             
            <TableBody 
                
                items={variations}
                loadingContent={<Spinner label="Loading..." />}
                emptyContent={"No variations in this delicacy"}
            >
                {
                    (item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        
                        <TableCell>
                        <Tooltip placement='left' color='primary' content='Edit'>
                                <Button onPress={()=>handleEditButtonClick(item)} color='primary' radius='full' variant='light' isIconOnly><MdEdit size={20}/></Button>
                            </Tooltip>
                            <Tooltip placement='right' color='danger' content='Delete' >
                                <Button color='danger' radius='full' variant='light' isIconOnly><MdDelete size={20}/></Button>
                            </Tooltip>    
                        </TableCell>
                    </TableRow>
                    )
                }
            </TableBody>   
        </Table>
    )
}


