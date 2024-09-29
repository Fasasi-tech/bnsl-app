'use client'
import React from 'react'
import { useSingleRfqResponseQuery } from '../../../../ui/utils/slices/usersApiSlice';
import Loader from '../../../../ui/utils/Loader';
import ResponsesProfile from '../../../ui/rfqresponse/ResponsesProfile';

const page = ({params}) => {

    const {id} = params;
    const {data, isLoading, error} = useSingleRfqResponseQuery(id)

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p className="font-bold">{error.data.message}</p>
    }
  return (
    <div className='px-4 mt-4 lg:px-8'>
        <ResponsesProfile  data={data}/>
    </div>
  )
}

export default page