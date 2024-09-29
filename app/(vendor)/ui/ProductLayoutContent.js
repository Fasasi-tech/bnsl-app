'use client'
import React, {useState, useEffect} from 'react';

import VendorSidebar from './VendorSidebar/VendorSidebar';
import { useStateContext } from '@/app/(admin)/context/ContextProvider';
import Navbar from './vendornavbar/Navbar';

const ProductLayoutContent = ({children}) => {
    const {open} = useStateContext()
  return (
    <>
        <div className={`${open ? 'w-72 fixed z-50 dark:bg-secondary-dark-bg bg-white ': 'w-0'} `}>
            <VendorSidebar />
        </div>
        <div className={`  min-h-screen w-full overflow-x-auto  ${open ? 'md:ml-72 ':'flex-1'}`}>
            <div className="fixed md:sticky md:top-0  z-50 dark:bg-slate-800 w-full flex flex-wrap">
                <Navbar />
            </div>
            {children}
        </div>
    </>
  )
}

export default ProductLayoutContent