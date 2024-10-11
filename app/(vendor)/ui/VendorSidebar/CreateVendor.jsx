'use client'
import React, {useState} from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Loader from '@/app/ui/utils/Loader';
import { Button } from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { useCreateVendorMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { useGetVendorSelfQuery } from '@/app/ui/utils/slices/usersApiSlice';
import VendorDialog from './VendorDialog';
import AddVendorDialog from './AddVendorDialog';


const CreateVendor = () => {
    const {data, isLoading, error} = useGetVendorSelfQuery()

    if (isLoading){
        return <Loader />
    }

    if (error){
        return (
            <p>{error?.data?.message}</p>
        )
    }

    const result= data?.data?.user

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
    
  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
        <div className='pb-8 flex justify-end items-center  border-1 border-b border-gray-200 mt-4'>
            <AddVendorDialog />
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/6'>Business Logo</TableHead>
                    <TableHead className='w-1/6'>Business Name</TableHead>
                    <TableHead className='w-1/6'>Description</TableHead>
                    <TableHead className='w-1/6'>City</TableHead>
                    <TableHead className='w-1/6'>Vendor Class</TableHead>
                    <TableHead className='w-1/6'>Created At</TableHead>
                    <TableHead className='w-1/6'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    result?(
                        <TableRow>
                             <TableCell className=' '>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src={result?.logo?.url} alt='avatar' />
                                        <AvatarFallback>{result?.name.slice(0,2)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </TableCell>
                            <TableCell className=" text-sm text-gray-400">
                               {result?.name}
                            </TableCell>
                            <TableCell className=" text-sm text-gray-400">
                                {result?.description.length <= 30?result?.description.slice(0,30):result?.description.slice(0,30)+'....'}
                            </TableCell>
                            <TableCell className=" text-sm text-gray-400">
                                    {result?.city}
                            </TableCell>
                            <TableCell className=" text-sm text-gray-400">
                                {result?.vendor_class}
                            </TableCell>
                            <TableCell className=" text-sm text-gray-400">
                                {formatDate(result?.createdAt)}
                            </TableCell>
                            <TableCell className=" text-sm text-gray-400">
                                <VendorDialog />
                            </TableCell>
                        </TableRow>):""
                    
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default CreateVendor