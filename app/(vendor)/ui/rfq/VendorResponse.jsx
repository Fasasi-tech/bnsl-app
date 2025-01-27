'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useVendorsresponseQuery } from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader'
import Link from 'next/link'

const VendorResponse = () => {
    const {data, isLoading, error} = useVendorsresponseQuery()

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p className='font-semibold'>{error?.message}</p>
    }

    console.log(data.data.user, 'user')
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };

  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className='w-1/6'>Product Name</TableHead>
                <TableHead className='w-1/6'>Business Name</TableHead>
                <TableHead className='w-1/6'>Date Created</TableHead>
                <TableHead className='w-1/6'>Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.data.user.map((i, index) =>(
                        <TableRow key={index}>
                            <TableCell className="w-1/6 text-sm">
                                {i.product.name}
                            </TableCell>
                            <TableCell className='w-1/6'>
                                {i?.vendor?.businessName}
                            </TableCell>
                            <TableCell className='w-1/6'>
                                {formatDate(i?.createdAt)}
                            </TableCell>
                            <TableCell className="w-1/6 text-sm ">
                                {/* <RFQAction userId={i._id}/> */}
                                <Link href ={`/rfq-response/${i._id}/singleResponse`}><Button variant='outline'><HiDotsHorizontal /></Button></Link>
                                
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default VendorResponse
