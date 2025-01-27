'use client'
import React from 'react'
import { useSingleRfqResponseQuery } from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader'
import ResponsesProfile from '@/app/(admin)/ui/rfqresponse/ResponsesProfile'

const page = ({params}) => {
    const {id} = params;
    const {data, isLoading, error} = useSingleRfqResponseQuery(id)

    if (isLoading){
        return <Loader />
    }

    if (error){ 
        return <p className="font-bold">{error.data.message}</p>
    }

    const result= data.data.user

  return (
    <div className='px-4 mt-4 lg:px-8'>
        <ResponsesProfile  data={result}/>
    </div>
  )
}

export default page