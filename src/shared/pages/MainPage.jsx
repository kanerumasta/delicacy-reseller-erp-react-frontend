import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import TokenValidate from '../TokenValidate'
import Cookies from 'js-cookie'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem,DropdownMenu,
  Dropdown, DropdownTrigger, Avatar, DropdownItem,  Link, useDisclosure,
  Modal, ModalBody, ModalContent, ModalFooter, Button, ModalHeader, Input, Divider, Tabs, Tab} from '@nextui-org/react';
import { BiUser } from 'react-icons/bi';
import { FaLock, FaUser } from 'react-icons/fa';
import { api } from '../api'; 

const MainPage = () => {
    const navigate = useNavigate()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [regUsername, setRegUsername] = useState('')
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
      const checkToken = async () => {
        try {
          const validate = TokenValidate();
          if(validate) return navigate('/')
          
        } catch (error) {
          console.error('Error checking token:', error);
          navigate('/main');
         }
  
        }
        checkToken()
      },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
    
        try {
          const response = await api.post('auth/login', formData)
      
          if(response && response.data){
            Cookies.set('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
            navigate('/')
          }
          else{console.log('error')}
         
        } catch (error) {
            console.log(error)
            // if(error.tat){
            //     alert('This account is not active')
            // }
        }
    }

    const handleRegisterSubmit = async (e) => {
      e.preventDefault()
       const formData = new FormData()
       formData.append('first_name', firstName)
       formData.append('last_name' , lastName)
       formData.append('username', regUsername)
       formData.append('password', passwordOne)
       formData.append('password2', passwordTwo)

       try {
        const response  = await api.post('/auth/register', formData)
        console.log(response)
       } catch (error) {
        console.error(error)
       }
    }

  return (
    <div>
       <>
    <Navbar
        isBordered
    classNames={{
      item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-primary",
      ],
      wrapper:[
        "w-full",
      ]
    }}
    >
      <NavbarContent className="w-full nav-content sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <Button color="secondary" variant="ghost">Create</Button>
            <Button color='primary' onPress={onOpen}>Log In</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <Tabs>
                  <Tab title="Login">
                  <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
                    <ModalBody>

                        <Input
                            value={username}
                            onValueChange={setUsername}
                             
                            size='lg' 
                            
                            isClearable 
                            label="Username" 
                            labelPlacement='outside'
                            startContent={<FaUser color='#5d5d5e'/>}    
                        />
                        <Input  
                            value={password} 
                            onValueChange={setPassword}
                            size='lg' 
                            autoComplete='new-password'  
                            label="Password" 
                            type="password" 
                            labelPlacement='outside'
                            startContent={<FaLock color='#5d5d5e'/>}
                            />
                    </ModalBody>
     
                <ModalFooter>
                  <Button type='button' color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" >
                    Login
                  </Button>
                </ModalFooter>
                </form>
                  </Tab>
                  <Tab key="register" title="Register">
                  <form onSubmit={handleRegisterSubmit}>
                <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
                    <ModalBody>

                        <Input
                            value={firstName}
                            onValueChange={setFirstName}
                             
                            size='lg' 
                           
                            isClearable 
                            label="First Name" 
                            labelPlacement='outside'
                            startContent={<FaUser color='#5d5d5e'/>}    
                        />
                        <Input
                            value={lastName}
                            onValueChange={setLastName}
                             
                            size='lg' 
                             
                            isClearable 
                            label="Last Name" 
                            labelPlacement='outside'
                            startContent={<FaUser color='#5d5d5e'/>}    
                        />
                        <Input  
                            value={regUsername} 
                            onValueChange={setRegUsername}
                            size='lg' 
                             
                            label="Username" 
                            
                            labelPlacement='outside'
                            startContent={<FaLock color='#5d5d5e'/>}
                            />
                        <Input  
                            value={passwordOne} 
                            onValueChange={setPasswordOne}
                            size='lg' 
                            autoComplete='new-password' 
                            label="Password" 
                            type="password"
                            labelPlacement='outside'
                            startContent={<FaLock color='#5d5d5e'/>}
                            />
                        <Input  
                            value={passwordTwo} 
                            onValueChange={setPasswordTwo}
                            size='lg' 
                            autoComplete='new-password' 
                            label="Confirm Password" 
                            type="password"
                            labelPlacement='outside'
                            startContent={<FaLock color='#5d5d5e'/>}
                            />
                    </ModalBody>
     
                <ModalFooter>
                  <Button type='button' color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" >
                    Register
                  </Button>
                </ModalFooter>
                </form>
                  </Tab>
                </Tabs>
                
              </>
            )}
          </ModalContent>
        </Modal>
        </>
    </div>
  )
}

export default MainPage
