'use client'
import React, {useState} from 'react'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import { useVendorHistoryQuery } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import classNames from 'classnames';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import AuditLog from '../auditLog/AuditLog';
const AuditPage = () => {

    const ITEMS_PER_PAGE = 10;

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    const {data:history, isLoading, isFetching, error} = useVendorHistoryQuery({page, limit:ITEMS_PER_PAGE, search})

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p>{error?.message}</p>
    }


    const result=history.data.user.getAllVendorsHistory;
    
    const totalPages = Math.ceil(history.data.user.result/ ITEMS_PER_PAGE)

    const dateString = (dateString) =>{
        const date = new Date(dateString)
        const options={
            weekday:"long", year:"numeric", month:"long", day:"numeric", 
        }

        return date.toLocaleString("en-US", options)
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    
    


  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
       <div className='flex flex-wrap md:flex-nowrap items-center justify-end gap-2 pb-8  border-1 border-b border-gray-200 mt-4'>
        <form>
        <Input
                placeholder='Search'
                className='w-72'
                value={search}
                onChange={handleChange}
            />  
        </form>
        
        </div> 
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Date Updated</TableHead>
                    <TableHead>Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    result.map((i, index) =>(
                        <TableRow key={index}>
                            <TableCell className='px-2 w-1/3'>
                            <div className='flex items-center gap-2'>
                                <p className='text-gray-500  font-medium'>{`${i.previousDetails.businessName}`}</p>
                                {/* <p className='text-gray-500  font-medium'>{` ${i.previousDetails.vendor_class}`}</p> */}
                            </div>
                            </TableCell>
                            <TableCell className={`w-1/6 text-sm font-bold text-blue-700 ${i.action==='DELETE'? 'text-red-600':'text-blue-700'}`}>{i.action ==='PATCH' ?'EDIT': i.action ==='DELETE'? 'DELETE':'' }</TableCell>
                            <TableCell className="w-1/6 text-sm text-gray-500  font-medium'">{dateString(i?.previousDetails.updatedAt)}</TableCell>
                            <TableCell className="w-1/6 text-sm text-gray-500  font-medium'"><AuditLog id={i._id} /></TableCell>
                            
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        <div className="flex justify-end gap-2 mt-4">
        {/* Previous button */}
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="bg-orange-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
                    isLoading={isFetching}
                >
                    <FaAngleLeft />
                </button>

                {/* Calculate the start and end pages to display only 3 buttons */}
                {(() => {
                    const startPage = Math.max(1, page - 1);
                    const endPage = Math.min(totalPages, startPage + 2);

                    return [...Array(endPage - startPage + 1)].map((_, index) => {
                    const currentPage = startPage + index;
                    return (
                        <Button
                        variant="secondary"
                        key={currentPage}
                        onClick={() => setPage(currentPage)}
                        className={classNames(
                            'px-3 rounded',
                            {
                            'bg-orange-300 text-white': page === currentPage,
                            'bg-gray-200': page !== currentPage,
                            },
                            'mx-1'
                        )}
                        isLoading={isFetching}
                        >
                        {currentPage}
                        </Button>
                    );
                    });
                })()}

                {/* Next button */}
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="bg-orange
-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
                    isLoading={isFetching}
                >
                    <FaAngleRight />
                </button>
        </div>

   
    </div>
  )
}

export default AuditPage