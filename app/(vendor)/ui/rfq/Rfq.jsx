'use client'
import React from 'react'
import { useRfqvendorQuery } from '../../../ui/utils/slices/usersApiSlice'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Loader from '../../../ui/utils/Loader'
import RFQAction from './RFQAction'


const Rfq = () => {

    const {data, isLoading, error} = useRfqvendorQuery()

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p className='font-semibold'>{error?.data?.message}</p>
    }

  

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
                    <TableHead className='w-1/6'>Product</TableHead>
                    <TableHead className='w-1/6'>Customer</TableHead>
                    <TableHead className='w-1/6'>Created At</TableHead>
                    <TableHead className='w-1/6'>Actions</TableHead>
                   
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.data.user.map((i, index) =>(
                    
                    <TableRow key={index}>
                        <TableCell className="w-1/6 text-sm text-gray-400">
                        {i.product?.name}
                        </TableCell>
                        <TableCell className="w-1/6 text-sm text-gray-400">
                            {i.buyer.email}
                        </TableCell>
                        <TableCell className="w-1/6 text-sm text-gray-400">
                            {formatDate(i.createdAt)}
                        </TableCell>
                        <TableCell className="w-1/6 text-sm text-gray-400">
                            <RFQAction userId={i._id}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default Rfq