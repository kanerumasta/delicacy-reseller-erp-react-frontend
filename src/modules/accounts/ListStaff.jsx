import React, { useEffect, useState } from 'react'
import { api } from '../../shared/api'
import { Table, TableBody, TableCell, TableColumn, TableHeader, 
        TableRow, Dropdown, DropdownItem, DropdownTrigger, Button, DropdownMenu, Spinner, Chip } from '@nextui-org/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { formatName } from './utils'
import Loading from '../../shared/components/Loading'
import LoadingLine from '../../shared/components/LoadingLine'

const ListStaff = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState(0)
    
    useEffect(()=>{
        async function getUsers() {
            try {
                const response = await api.get('auth/users')
                if(response && response.status === 200){
                    setUsers(response.data)
                    console.log(users)
                }   
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }
        getUsers()
    },['',refresh])

    

    async function activateUserAccount(userId){
        try {
            const response = await api.patch(`auth/activate/${userId}`)
            if(response && response.status === 200){
                console.log(response.data)
                alert('activated')
                setRefresh(refresh + 1)
            }
        } catch (error) {
            console.log(error)
        }   
    }

    function isActiveUser(userId){
        let activeUsers = []
        for(const user of users.entries()){
            if(user.is_active){
                activeUsers.append(user.id)
            }
        }
        // if(userID in )
    }



  return (
    <div>
        {isLoading && <LoadingLine />}
        <Table aria-label="Users Table">
            <TableHeader>
                <TableColumn>Staff</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No users found" items={users}>
                {user => (
                    <TableRow key={user.id}>
                        <TableCell>{formatName(user.first_name, user.last_name)}</TableCell>
                        <TableCell>{user.is_active? <Chip variant='dot' color='success'>active</Chip> : <Chip variant='dot' color="danger">inactive</Chip>}</TableCell>
                        <TableCell>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button 
                                            isIconOnly
                                            radius='full'
                                            variant="light" 
                                            >
                                            <BiDotsVerticalRounded size={20} color='#a1a1aa'/>
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
                                            <DropdownItem key="view">Details</DropdownItem>
                                            <DropdownItem onPress={()=>{activateUserAccount(user.id)}} key="edit">Activate account</DropdownItem>
                                            <DropdownItem key="delete" className="text-danger" color="danger">
                                            Deactivate Account
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                            </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>

    </div>
  )
}

export default ListStaff
