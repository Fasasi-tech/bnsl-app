'use client'
import React from 'react'
import { useSingleRfqQuery } from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader'
import SingleRfq from '@/app/(admin)/ui/rfqresponse/SingleRfq'


const page = ({params}) => {
    const {id} = params;
    const {data, isLoading, error} = useSingleRfqQuery(id)

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p>{error.message}</p>
    }
  return (
    <div className='px-4 mt-4 lg:px-8'>
        <SingleRfq data={data}/>
    </div>
  )
}

export default page