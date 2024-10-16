'use client'
import React, {useEffect, useState} from 'react';
import { FaBars } from "react-icons/fa";
import { useStateContext } from '../../context/ContextProvider';
import { IoIosNotificationsOutline } from "react-icons/io";
import dynamic from "next/dynamic";
const Navbar = () => {
  const { open, setOpen, screenSize, setScreenSize, notificationCount } = useStateContext();
  const [isBlurred, setIsBlurred] = useState(false)

  useEffect(() =>{
    const handleScroll =() =>{
      if(window.scrollY > 100){
          setIsBlurred(true)
      }else{
        setIsBlurred(true)
      }
    }

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setOpen(!open);

  return (
    <div className={`w-full p-0 lg:px-4 ${isBlurred ? 'backdrop-blur-md' : ''}`}>
      <div className='mt-4'>
        <div className='bg-white dark:bg-slate-800 p-4 mx-4 py-4 rounded-md flex items-center justify-between align-center'>
          <FaBars
            className="text-orange-300 text-xl cursor-pointer"
            onClick={handleActiveMenu}
          />
         <div className='relative'>
            <IoIosNotificationsOutline className='text-3xl text-orange-300' />
            <span className='absolute -top-2 left-3 bg-red-700 w-5 h-5 flex items-center justify-center rounded-full text-white text-sm'>
              {notificationCount > 0 ? notificationCount : '0'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic (() => Promise.resolve(Navbar), {ssr: false})
