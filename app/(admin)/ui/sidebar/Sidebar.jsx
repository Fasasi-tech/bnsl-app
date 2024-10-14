'use client'
import React, {useEffect, useState} from 'react'
import { useStateContext } from '../../context/ContextProvider'
import { Menus } from '@/app/ui/utils/Menus'
import { IoCloseSharp } from "react-icons/io5";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { CiLogout } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { useLogoutMutation } from '@/app/ui/utils/slices/usersApiSlice'
import {logout} from '@/app/ui/utils/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import dynamic from "next/dynamic";
import { GiCancel } from "react-icons/gi";


const Sidebar = () => {
    const [isClient, setIsClient] = useState(false);
    const {open, setOpen} = useStateContext()
    const pathname= usePathname()
    const isActive = (path) => path === pathname;
    const [logouts] = useLogoutMutation()
    const router = useRouter()
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state) =>state.auth)

    const handleLogout = async () =>{
        try{
            await logouts().unwrap()
           dispatch(logout())
           router.push('/')
        } catch(err){
            alert (err.message || 'something went wrong!')
        }
    }
    const handleActiveMenu = () => setOpen(!open);

    useEffect(() => {
        setIsClient(true);
      }, []);
    
      if (!isClient) {
        return null; // Or return a loading spinner, etc.
      }

  return (
    <>
    <div className='flex h-screen relative dark:bg-slate-800'>
        <div className={`bg-white dark:bg-slate-800 p-5 pt-8 ${open ? 'w-56' : 'w-0'} duration-300 overflow-auto relative ${!open && 'hidden'}`}>
            {/* <  MdCancel className={`text-orange-300   rounded-full text-center text-5xl absolute -right-0 top-9 pr-4  cursor-pointer`}  onClick={() =>setOpen(!open)}/> */}
            {/* <div className= 'w-32'>
                <Image
                    src={logo}
                    alt='image'
                    className='w-full h-full'
                    />
            </div> */}
            {/* <button onClick={() => setOpen(!open)} className="p-2 ">
                {open ? 'Close' : 'Open'}
                </button> */}
                 <div className='  text-orange-300 text-2xl flex justify-end mt-4 cursor-pointer'>
                    <GiCancel onClick={handleActiveMenu} />
                </div>
            <div className="mt-8">
                {Menus.map((menu) => {
                     if (menu.title === 'Users' && (!userInfo || !['admin', 'superAdmin', 'R.O.A'].includes(userInfo.data.user.role))) {
                        return null;
                      }

                      if (menu.title === 'Emailing' && (!userInfo || !['admin', 'superAdmin'].includes(userInfo.data.user.role))) {
                        return null;
                      }

                      if (menu.title === 'Dashboard' && (!userInfo || !['admin', 'superAdmin'].includes(userInfo.data.user.role))) {
                        return null;
                      }
                    return (
                        <div key={menu.id || index} className='mt-2' title={menu.title}>
                            <Link href={menu.path} className={`flex items-center justify-start gap-4 py-3 px-2 font-bold ${isActive(menu.path)? 'bg-orange-100 px-2  rounded-lg text-orange-300': ''}  cursor-pointer rounded-lg `}>
                                <span className="text-xl text-orange-300">
                                    {menu.icon}
                                </span>
                                <span className='text-sm text-gray-500'>
                                    {menu.title}
                                </span>
                            </Link>
                        </div>
                    )
                })}
                <div  className="flex items-center justify-start gap-4 py-4 px-2 font-bold bg-gray-200 dark:bg-slate-800 rounded-lg mt-8 cursor-pointer" onClick={handleLogout} >
                    <span className="text-xl text-orange-300">
                        <CiLogout />
                    </span>
                    <span className={`${!open && "hidden"} text-sm text-gray-500`}>
                        Log out
                    </span>
                </div>
                
            </div> 
        </div>
        </div>
        </>
  )
}

export default dynamic (() => Promise.resolve(Sidebar), {ssr: false})