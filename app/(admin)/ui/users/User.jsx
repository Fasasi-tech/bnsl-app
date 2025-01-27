'use client'
import Loader from '@/app/ui/utils/Loader'
import { useUsersSortQuery } from '@/app/ui/utils/slices/usersApiSlice'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow  } from '@/components/ui/table'
import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

const User = () => {
  const {data, isLoading, error} = useUsersSortQuery()

  if (isLoading){
    return <Loader />
  }

  if (error){
    return <p>{error?.message}</p>
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
            <TableHead className='py-8'>User</TableHead>
            <TableHead className='py-8'>Role</TableHead>
            <TableHead className='py-8'>Status</TableHead>
            <TableHead className='py-8'>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
           {data.data.user.map((i, index) =>(
              <TableRow key={index}>
                <TableCell className='py-8'>{i.email}</TableCell>
                <TableCell className='py-8'>{i?.group?.name}</TableCell>
                <TableCell className='py-8'>{i.active ? 'True': 'False'}</TableCell>
                <TableCell className='py-8'>{formatDate(i.createdAt)}</TableCell>
             </TableRow>
           ))}
         
        </TableBody>

      </Table>

    </div>
  )
}

export default User