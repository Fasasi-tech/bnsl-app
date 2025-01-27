'use client'
import React, {useState} from 'react'
import { useRfqResponsesQuery } from '../../../ui/utils/slices/usersApiSlice'
import Loader from '../../../ui/utils/Loader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import RFQresponseActions from './RFQresponseActions'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import classNames from 'classnames';
import Link from 'next/link'
import { HiDotsHorizontal } from "react-icons/hi";

const Responses = () => {
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE= 6;
    const {data, isLoading, error, isFetching} = useRfqResponsesQuery({page, limit:ITEMS_PER_PAGE})
 
    if (isLoading){
    return <Loader />
 }

 if (error){
    return <p>{error?.data?.message}</p>
 }
    const result= data?.data?.user
    console.log('result', result)
   // const totalPages= Math.ceil(data?.data?.user?.countResult / ITEMS_PER_PAGE)

    // const batchSize = 5; // Number of pages to show in each batch
    // const startPage = Math.floor((page - 1) / batchSize) * batchSize + 1;
    // const endPage = Math.min(startPage + batchSize - 1, totalPages);
    
    // if (result?.length === 0) {
    //     return <div className='font-bold text-orange-300'>No RFQs available.</div>;
    // }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
  return (
    <div  className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
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
                    result.map((i, index) =>(
                        <TableRow key={index}>
                            <TableCell className='px-2 w-1/3'>
                                {i?.product?.name}
                            </TableCell>
                            <TableCell className='w-1/6'>
                                {i?.vendor?.businessName}
                            </TableCell>
                            <TableCell className='w-1/6'>
                                {formatDate(i?.createdAt)}
                            </TableCell>
                            <TableCell className='w-1/6'>
                                {/* <RFQresponseActions userId={i._id} /> */}
                                <Link href={`/rfq-responses/${i._id}/profile`}><Button variant='outline'><HiDotsHorizontal /></Button></Link>
                            </TableCell>
                        </TableRow>
                    ))
                    
                }
            
            </TableBody>
        </Table>
       
    </div>
  )
}

export default Responses