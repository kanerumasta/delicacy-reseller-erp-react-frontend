import { Accordion, AccordionItem, Divider, Spacer } from '@nextui-org/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: rgba(0,0,0,0.5);
  align-items: center;
  padding-left: 8px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  transition : all 0.3s ease;

  &:hover {
    
    color:#000;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
 
  color: rgba(0,0,0,0.5);

`;

const DropdownLink = styled(Link)`
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;

  border-radius : 8px;
  font-size: 16px;
  transition : 0.3s;
  
  &:hover {
    color:#000;
    background:#cce2fc;
    cursor: pointer;
  }
`;
const SubNav = styled.div`
  box-shadow: 
  inset 5px 0px 10px #c0c0c0,
  inset -5px 0px 10px #ffffff;
  width: 100%;
  padding : 5px;
`

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
    {item.subNav ? (
        <div onClick={showSubnav}>
           
          <Accordion className='accordion-menu'>
          
            <AccordionItem startContent={item.icon} title={<SidebarLabel>{item.title}</SidebarLabel>} style={{ color: 'gray' }}>
              {item.subNav.map((item, index) => {
                return (
                  <DropdownLink to={item.path} key={index}>
                    {item.icon}
                    <Spacer x={3}/>
                    {item.title}
                  </DropdownLink>
                );
              })}
              
            </AccordionItem>
           
          </Accordion>
         
        </div>
      ) :(
     
        <div>
           
           <SidebarLink to={item.path}>
                    {item.icon}
                    <Spacer x={3} />
                    {item.title}
           </SidebarLink>
        </div>    
   
      )}

    </>
  );
};

export default SubMenu;