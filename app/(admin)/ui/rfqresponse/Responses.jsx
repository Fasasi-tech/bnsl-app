'use client'
import React from 'react'
import { useRfqResponsesQuery } from '../../../ui/utils/slices/usersApiSlice'
import Loader from '../../../ui/utils/Loader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import RFQresponseActions from './RFQresponseActions'

const Responses = () => {
    const {data, isLoading, error} = useRfqResponsesQuery()
 
    if (isLoading){
    return <Loader />
 }

 if (error){
    return <p>{error?.data?.message}</p>
 }
    const result= data.data.user

  return (
    <>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/6'>Product Name</TableHead>
                    <TableHead className='w-1/6'>Product Category</TableHead>
                    <TableHead className='w-1/6'>Sender Email</TableHead>
                    <TableHead className='w-1/6'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    result.map((i, index) =>(
                        <TableRow key={index}>
                            <TableCell className='px-2 w-1/3'>
                                {i.product.name}
                            </TableCell>
                            <TableCell className='w-1/6'>
                                {i.product.category}
                            </TableCell>
                            <TableCell className='w-1/6'>
                                {i.customerEmail}
                            </TableCell>
                            <TableCell className='w-1/6'>
                                <RFQresponseActions userId={i._id} />
                            </TableCell>
                        </TableRow>
                    ))
                    
                }
            
            </TableBody>
        </Table>
    </>
  )
}

export default Responses