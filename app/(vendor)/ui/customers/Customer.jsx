'use client'
import React, {useState} from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FaSearch } from "react-icons/fa";
import Loader from '@/app/ui/utils/Loader';
import { useCustomerQuery } from '@/app/ui/utils/slices/usersApiSlice';
import { IoIosPersonAdd } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { HiDotsHorizontal } from "react-icons/hi";
import CustomerTrigger from './CustomerTrigger';
import { Input } from '@/components/ui/input';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import classNames from 'classnames';

const Customers = () => {
 
  const ITEMS_PER_PAGE = 10;

  const [search,  setSearch] = useState('')
  const [page, setPage] = useState('')
  const {data, isLoading, isFetching,  error} = useCustomerQuery({ page, limit: ITEMS_PER_PAGE, search})
  

  if (isLoading){
    return <Loader />
  }

  if (error){
    return <p>{error.message}</p>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const handleChange =(e) =>{
    setSearch(e.target.value)
  }

  const totalPages = Math.ceil(data.data.user.result / ITEMS_PER_PAGE)
  const batchSize = 5; // Number of pages to show in each batch
  const startPage = Math.floor((page - 1) / batchSize) * batchSize + 1;
  const endPage = Math.min(startPage + batchSize - 1, totalPages);
  

  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
      <p className='text-lg md:text-2xl font-semibold pb-2'> Customer management</p>
      <p className='text-sm text-gray-500'>Manage your team members and their account permissions here.</p>
      <div className='mb-4 mt-8 flex items-center justify-between'>
        <p className='text-lg md:text-2xl font-semibold pb-2'>All Customers</p>
        <div className='flex justify-start gap-2'>
            <form>
                <div className="relative ">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder= 'Search'
                    className='w-36 md:w-72 pl-10'
                    value={search}
                    onChange={handleChange}
                />
                </div>
            </form>
            <Button
            variant='destructive'>
              <CustomerTrigger />
            </Button>
            {/* <Button  variant='orange' className='text-lg'><IoIosPersonAdd/> <span className='pl-2 text-sm'>Customer</span></Button> */}

        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.data.user.Customers.map((customer, index) =>(
              <TableRow key={index}>
                <TableCell className='py-2'>
                  <div className='flex items-center gap-2'>
                    <Avatar>
                      <AvatarImage src={customer.image.url} alt='avatar' />
                      <AvatarFallback>{`${customer?.firstName?.toUpperCase().slice(0,1)}${customer?.lastName?.toUpperCase().slice(0,1)}`}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='  font-medium dark:text-white'>{`${customer.firstName} ${customer.lastName}`}</p>
                      <p className=' text-sm dark:text-white'>{customer.user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.user.active ? 'Active': "In-Active"}</TableCell>
                <TableCell>{customer.user.group.name}</TableCell>
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{formatDate(customer.createdAt)}</TableCell>
                <TableCell><Link href={`/customer/${customer._id}/profile`}><Button variant='outline'><HiDotsHorizontal /></Button></Link></TableCell>
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
            className="bg-orange-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
            isLoading={isFetching}
        >
            <FaAngleRight />
        </button>
      </div>     
    </div>
  )
}

export default Customers