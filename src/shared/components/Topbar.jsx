import React from 'react'
import Cookies from 'js-cookie'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem,DropdownMenu,
  Dropdown, DropdownTrigger, Avatar, DropdownItem,  Link, useDisclosure,
  Modal, ModalBody, ModalContent, ModalFooter, Button, ModalHeader, Divider, Spacer} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { MdSettings, MdNotifications, MdLogout, MdHelpCenter } from 'react-icons/md';
const Topbar = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const navigate = useNavigate()
  return (
    <>
    <Navbar
    position='static'
    classNames={{
      item: [
        "flex",

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
      <NavbarBrand color="primary">
        DELICACY RESELLER
      </NavbarBrand>
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
          
            <Avatar
              
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Mac Nino Ibale"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
           
          </DropdownTrigger>
          <DropdownMenu color='primary' aria-label="Profile Actions" variant="flat">
            <DropdownItem textValue='SSS' key="profile" className="h-18 gap-2">
              <p className="font-semibold">Logged in as Mackoy</p>
              <Spacer y={4}/>
              <Divider />
            </DropdownItem>
            
            <DropdownItem endContent={<MdSettings color='#7b7b84' size={20}/>} textValue='lll' key="settings">My Settings</DropdownItem>
           
            <DropdownItem endContent={<MdNotifications color='#7b7b84' size={20}/>} textValue='lll' key="system">Notifications</DropdownItem>
            <DropdownItem endContent={<MdHelpCenter color='#7b7b84' size={20}/>} textValue='lll' key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem endContent={<MdLogout color='#f75c92' size={20}/>} textValue='lll' onPress={onOpen} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
             
                <ModalHeader className="flex flex-col gap-1">Proceed Logout?</ModalHeader>
               
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" onPress={()=>{ navigate('/main'); Cookies.remove('accessToken'); localStorage.clear();}}>
                    Yes
                  </Button>
                </ModalFooter>
             
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  ); 
}

export default Topbar