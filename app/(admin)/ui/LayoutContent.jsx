'use client'
import React, {useState, useEffect} from 'react';
import Navbar from './navbar/Navbar';
import socket from '@/app/ui/utils/socket'

import Sidebar from './sidebar/Sidebar';
import styles from './../adminLayout.module.css'
import { useStateContext } from '../context/ContextProvider';

const LayoutContent = ({children}) => {
const { open } = useStateContext()



  return (
    <>
  
   <div className={`${open ? 'w-72 fixed z-50 dark:bg-secondary-dark-bg bg-white ': 'w-0'} `}>
      <Sidebar />
    </div>

   
      <div className={`  min-h-screen w-full overflow-x-auto  ${open ? 'md:ml-72 ':'flex-1'}`}>
        <div className="fixed md:sticky md:top-0  z-50 dark:bg-slate-800 w-full flex flex-wrap">
          <Navbar />
        </div>
            {children}
      </div>
     
  </>
  );
};

export default LayoutContent;
