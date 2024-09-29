'use client'
import React from 'react'
import { useStateContext } from '@/app/(admin)/context/ContextProvider'
import { useState, useEffect } from 'react'
import { Menus } from '@/app/ui/utils/ProductMenu'
import { usePathname } from 'next/navigation';
import { CiLogout } from "react-icons/ci";
import Link from 'next/link'

const VendorSidebar = () => {
    const {open, setOpen} = useStateContext();
    const pathname = usePathname()
    const isActive = (path) => path === pathname;
  return (
    <>
        <div className='flex h-screen relative dark:bg-slate-800'>
            <div  className={`bg-white dark:bg-slate-800 p-5 pt-8 ${open ? 'w-72' : 'w-0'} duration-300 overflow-auto relative ${!open && 'hidden'}`}>
                <div className="mt-16">
                    {Menus.map((menu) => {
                        return (
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
                        )
                    })}
                    <div  className="flex items-center justify-start gap-4 py-4 px-2 font-bold bg-gray-200 dark:bg-slate-800 rounded-lg mt-8 cursor-pointer"  >
                        <span className="text-xl text-green-300">
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

export default VendorSidebar