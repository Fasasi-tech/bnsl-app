'use client'
import { useSingleProductsQuery } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';
import React from 'react'
import SingleProduct from '@/app/(vendor)/ui/product/SingleProduct';

const page = ({params}) => {
    const {id} = params;
    const {data, isLoading, error} = useSingleProductsQuery(id)

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p>{error}</p>
    }

  return (
    <div className='px-4 mt-4 lg:px-8 w-full'>
      <SingleProduct data={data} id={id} />
    </div>
  )
}

export default page