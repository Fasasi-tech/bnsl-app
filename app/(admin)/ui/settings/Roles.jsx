'use client'
import React from 'react'
import CreateRoleDialog from './CreateRoleDialog'
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import ActionPopover from './Popover'
import { useGroupQuery } from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader'


const Roles = () => {
    const {data, isLoading, error} = useGroupQuery()

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p className='font-semibold'>{error?.message}</p>
    }

    const result = data?.data.user
  return (
    <div className='relative bg-white'>
        <div className='absolute right-0 bottom-0 z-50 w-12 h-12 bg-orange-400 rounded-full'>
            <CreateRoleDialog />
        </div>
        <Table> 
            <TableCaption>A list of your Role</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    result.map((i, index) =>(
                        <TableRow key={index}>
                            <TableCell>{i.name}</TableCell>
                            <TableCell><ActionPopover id={i._id}/></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default Roles