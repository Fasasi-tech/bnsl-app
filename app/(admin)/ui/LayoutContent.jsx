'use client'
import React, {useState, useEffect} from 'react';
import Navbar from './navbar/Navbar';
import socket from '@/app/ui/utils/socket'

import Sidebar from './sidebar/Sidebar';
import styles from './../adminLayout.module.css'
import { useStateContext } from '../context/ContextProvider';

const LayoutContent = ({children}) => {
const { open } = useStateContext()
const [screenWidth, setScreenWidth] = useState(0);
// const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
const navbarHeight = '64px';


useEffect(() => {
  // Set initial width when component mounts
  setScreenWidth(window.innerWidth);

  const handleResize = () => setScreenWidth(window.innerWidth);

  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <>
  
   <div className={`${open ? 'w-72 fixed z-50 dark:bg-secondary-dark-bg bg-white ': 'w-0'} `}>
      <Sidebar />
    </div>

   
      <div className={`  min-h-screen w-full overflow-x-auto  ${open ? 'md:ml-72 ':'flex-1'}`}>
        <div className='fixed top-0  z-50 dark:bg-slate-800 w-full flex flex-wrap h-[64px]'  style={{ width: open && screenWidth >= 768 ? 'calc(100% - 18rem)' : '100%' }} >
          <Navbar />
        </div>
        <div style={{ paddingTop: navbarHeight }} className='mt-8'>
          {children}
        </div>
      </div>
     
  </>
  );
};

export default LayoutContent;







