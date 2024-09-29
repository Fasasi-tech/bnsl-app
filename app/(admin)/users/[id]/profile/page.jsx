'use client'
import UserProfile from '@/app/(admin)/ui/user/UserProfile';
import Loader from '@/app/ui/utils/Loader';
import { useSingleUserQuery } from '@/app/ui/utils/slices/usersApiSlice';
import React from 'react'

const page = ({params}) => {
    const {id} = params;
    const {data, isLoading, error}= useSingleUserQuery(id)

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p className='font-bold text-green-300'>{error}</p>
    }
    console.log('dat',data)
  return (
    <div className='px-4 mt-4 lg:px-8'>
        <UserProfile data={data} />
    </div>
  )
}

export default page