'use client'
import React, {useState, useEffect} from 'react';

import VendorSidebar from './VendorSidebar/VendorSidebar';
import { useStateContext } from '@/app/(admin)/context/ContextProvider';
import Navbar from './vendornavbar/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import {logout} from '@/app/ui/utils/slices/authSlice'

const ProductLayoutContent = ({children}) => {
    const { open } = useStateContext()
const [screenWidth, setScreenWidth] = useState(0);
const navbarHeight = '64px';
const {userInfo} = useSelector((state) => state.auth)
const router = useRouter();
const dispatch = useDispatch()



    useEffect(() => {
        // Set initial width when component mounts
        setScreenWidth(window.innerWidth);
      
        const handleResize = () => setScreenWidth(window.innerWidth);
      
        window.addEventListener('resize', handleResize);
      
        return () => window.removeEventListener('resize', handleResize);
      }, []);
      
      useEffect(() => {
        if (!userInfo) {
          router.push('/'); // Redirect to login if no user info
        } else {
          const token = userInfo.token;
          const decoded = jwtDecode(token);
      
          // Check for token expiration
          const expirationTime = decoded.exp * 1000 - 60000; 
          
          if (Date.now() >= expirationTime) {
            dispatch(logout())
            router.push('/');
          } else {
            const timer = setTimeout(() => {
              dispatch(logout())
              router.push('/');
            }, expirationTime - Date.now());
      
            return () => clearTimeout(timer); // Cleanup
          }
        }
      
        if (!userInfo?.active){
          dispatch(logout())
        }
      }, [router, userInfo]);
  return (
    <>
        <div className={`${open ? 'w-56 fixed z-50 dark:bg-secondary-dark-bg bg-white ': 'w-0'} `}>
            <VendorSidebar />
        </div>
        <div className={`  min-h-screen w-full overflow-x-auto  ${open ? 'md:ml-56 ':'flex-1'}`}>
            <div className='fixed top-0  z-40  dark:bg-slate-800 w-full flex flex-wrap h-[64px]'  style={{ width: open && screenWidth >= 768 ? 'calc(100% - 15rem)' : '100%' }}>
                <Navbar />
            </div>
            <div style={{ paddingTop: navbarHeight }} className='mt-4'>
                {children}
            </div>
        </div>
    </>
  )
}

export default ProductLayoutContent