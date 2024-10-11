import React from 'react'
import Users from '../ui/user/Users'
import AdminRoute from '@/app/ui/utils/protectedroute/AdminRoute'
import dynamic from "next/dynamic";


const page = () => {
  return (
    <div className='px-4 mt-4 lg:px-8'>
        <Users />   
    </div>
  )
}

export default dynamic (() => Promise.resolve(page), {ssr: false})