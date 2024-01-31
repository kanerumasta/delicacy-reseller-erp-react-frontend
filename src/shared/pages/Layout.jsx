import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import TokenValidate from '../TokenValidate';
import Loading from '../components/Loading';
import Topbar from '../components/Topbar';
import MainPage from './MainPage';
import LoadingLine from '../components/LoadingLine';

export const LoadingContext = createContext()

const MainContainer = styled.div`
  display: flex;
  flex-direction : column;
  height :100vh;
`;


const MainContent = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
 
  
`;

const Content = styled.div`
  height : 100%;
  overflow: auto;
  padding : 15px;
  width:100%;
  padding-left : 20px;
  position : relative;
`;

const Layout = () => {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const checkToken = async () => {
      try {
        const validate = TokenValidate();
        if(!validate) return navigate('/main')
        setReady(true);
      } catch (error) {
        console.error('Error checking token:', error);
        setReady(false);
        navigate('/main');
       }

      }
      checkToken()
    },[])

  return (

    <div className="h-screen grid grid-cols-3">
    <div className="bg-sky-700 col-span-1">
      <p>Content 1</p>
    </div>
    <div className="bg-purple-700 col-span-2">
      <p>Content 2</p>
    </div>
  </div>
  );
};

export default Layout;
