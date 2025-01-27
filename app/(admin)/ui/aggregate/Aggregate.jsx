'use client'
import React from 'react'
import Image from 'next/image'
import Logo from '../../../../public/icons8.png'
import admin from '../../../../public/administrator.png'
import market from '../../../../public/market.png'
import roa from '../../../../public/roa.png'
import { useUsersStatQuery } from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader'

const Aggregate = () => {
    const {data, isLoading, error} = useUsersStatQuery()

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p>{error?.message}</p>
    }


    const datas = data.data.user;

    // const aggregate =(role) =>{
    //     const results=datas.find((data)=> data._id ===role)

    //    return  results ? results.count :0
    // }

  return (
    <div className=' md:flex mb-2 flex-wrap gap-4 justify-between  text-center'>
        {
            datas.map((role) =>(
                <div className='bg-white dark:bg-slate-800 p-2 md:p-4 rounded-md shadow-lg  mb-4  max-h-32 flex-auto'>
                    <div className='flex items-center gap-2 justify-start  '>
                        <div className='bg-orange-200 p-1 rounded-sm'>
                            <Image
                                src={admin}
                                alt='logo'
                                className='w-8 '
                            />
                        </div>
                            <p className='text-gray-400 font-medium'>{role._id}</p> 
                    </div>  
                    <h1 className='text-orange-300  text-[40px]'>{role.count}</h1>
                </div>

            ))
        }
    </div>
  )
}

export default Aggregate