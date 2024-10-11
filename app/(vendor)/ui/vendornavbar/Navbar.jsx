'use client'
import React, {useState, useEffect} from 'react';
import { FaBars } from "react-icons/fa";
import { useStateContext } from '@/app/(admin)/context/ContextProvider';


const Navbar = () => {
  const { open, setOpen, screenSize, setScreenSize} = useStateContext();
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
      <div className='mt-8'>
        <div className='bg-white dark:bg-slate-800 p-4 mx-4 py-4 rounded-md flex items-center justify-between align-center'>
         <FaBars
            className="text-green-300 text-3xl cursor-pointer"
            onClick={handleActiveMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
