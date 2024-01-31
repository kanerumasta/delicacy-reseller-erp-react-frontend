import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { adminSidebarData, staffSidebarData } from './SideBarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { IoMdMenu } from 'react-icons/io';

import { isAdminUser } from '../utils';
import { Divider, Spacer } from '@nextui-org/react';
const SidebarNav = styled.nav`
  background: #fff;
  color:#000;
  min-width: 280px;
  padding:0;
  max-height : calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y:auto;
  transition: 500ms;
  z-index: 10;

`;

const SidebarWrap = styled.div`
  width: 100%;
  padding-left:10px;
  padding-right:10px;
`;

const IconContainer = styled.div`
max-width:100%;
height: 60px;
display:flex;
justify-content:flex-end  ;
background-color:#fff;
padding:10px;
`

const Sidebar = () => {
  const sidebarData = isAdminUser() ? adminSidebarData : staffSidebarData

  return (
    <>
      <IconContext.Provider value={{ color: '#562df4', size : 20 }}>
        <SidebarNav className='sm:hidden' >
          <SidebarWrap $sidebar>
          <IconContainer>
               < IoMdMenu color='#fff' size={30}/>  
          </IconContainer> 
           <Spacer y={4}/>
           <Divider />
           <Spacer y={4}/>
            {           
                  sidebarData.map((item, index) => (
                  <SubMenu item={item} key={index} />
                  ))        
            }
            <Spacer y={4}/>
           <Divider />
          </SidebarWrap>
         
          <Spacer y={20}/>
        </SidebarNav>
      </IconContext.Provider>
     
    </>
  );
};

export default Sidebar;