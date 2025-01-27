'use client'
import CustomerProfile from '@/app/(vendor)/ui/customers/CustomerProfile'
import Loader from '@/app/ui/utils/Loader'
import { useSingleCustomerQuery } from '@/app/ui/utils/slices/usersApiSlice'
import React from 'react'

const page = ({params}) => {
    const {id}= params
    const {data, isLoading, error} = useSingleCustomerQuery(id)
       
    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p>{error.data.message}</p>
    }

    const result= data.data.user

  return (
    <div className='px-4 mt-4 lg:px-8'>
        <CustomerProfile data={result} />
    </div>
  )
}

export default page