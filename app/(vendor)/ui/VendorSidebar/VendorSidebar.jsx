'use client'
import React from 'react'
import { useStateContext } from '@/app/(admin)/context/ContextProvider'
import { Menus } from '@/app/ui/utils/ProductMenu'
import { usePathname } from 'next/navigation';
import { CiLogout } from "react-icons/ci";
import Link from 'next/link'
import { useLogoutMutation } from '@/app/ui/utils/slices/usersApiSlice'
import {logout} from '@/app/ui/utils/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { GiCancel } from "react-icons/gi";


const VendorSidebar = () => {
    const {open, setOpen} = useStateContext();
    const pathname = usePathname()
    const isActive = (path) => path === pathname;
    const [logouts] = useLogoutMutation()
    const router = useRouter()
    const dispatch = useDispatch()

    
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

  return (
        <div className='flex h-screen relative bg-white dark:bg-slate-800'>
            <div  className={`bg-white dark:bg-slate-800 p-5 pt-8 ${open ? 'w-60' : 'w-0'} duration-300 overflow-auto relative ${!open && 'hidden'}`}>
                <div className='  text-green-300 text-2xl flex justify-end mt-4 cursor-pointer'>
                    <GiCancel onClick={handleActiveMenu} />
                </div>
                <div className="mt-4">
                    {Menus.map((menu) => {
                        return (
                            <>
                            <div>

                            </div>
                            <div key={menu.id || index} className='mt-4' title={menu.title}>
                                <Link href={menu.path} className={`flex items-center justify-start gap-4 py-4 px-4 font-bold ${isActive(menu.path)? 'bg-green-100 px-4  rounded-lg text-green-300': ''}  cursor-pointer rounded-lg `}>
                                    <span className="text-xl text-green-300">
                                        {menu.icon}
                                    </span>
                                    <span className='text-sm text-gray-500'>
                                        {menu.title}
                                    </span>
                                </Link>
                            </div>
                            </>
                        )
                    })}
                    <div  className="flex items-center justify-start gap-4 py-4 px-2 font-bold bg-gray-200 hover:bg-green-300 dark:bg-slate-800 rounded-lg mt-8 cursor-pointer"  onClick={handleLogout}  >
                        <span className="text-xl text-green-300">
                            <CiLogout />
                        </span>
                        <span className={`${!open && "hidden"} text-sm text-gray-500 `}>
                            Log out
                        </span>
                    </div>
                    
                </div> 
            </div>
        </div>
  )
}

export default VendorSidebar