'use client'
import React from 'react'
import Loader from '@/app/ui/utils/Loader'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { HiDotsHorizontal } from 'react-icons/hi'
import Link from 'next/link'


const SingleRfq = ({data}) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  return (
    <div>
      <div className='bg-white dark:bg-slate-800 py-4 px-4 rounded-lg shadow-lg overflow-x-auto mt-2 dark:text-white'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <p className='text-sm text-gray-600 dark:text-white'>Product Name</p>
            <p className='text-sm text-gray-600 font-semibold dark:text-white pt-2'>{data?.data?.user?.product}</p> 
          </div>
          <div>
            <p className='text-sm text-gray-600 dark:text-white'>Product Category</p>
            <p className='text-sm text-gray-600 font-semibold dark:text-white pt-2'>{data?.data?.user?.categories.map((category) => <p>{category.name}</p>)}</p> 
          </div>
          <div>
            <p className='text-sm text-gray-600 dark:text-white'>Product Description</p>
            <p className='text-sm text-gray-600 font-semibold dark:text-white pt-4 mt-2 border border-gray-100 p-4 rounded-lg'>{data?.data?.user?.description}</p> 
          </div>
          <div>
            <p className='text-sm text-gray-600 dark:text-white'>Request for Quotation Document</p>
            <p className='text-sm  font-semibold dark:text-white text-orange-300 underline pt-2'><a href={data?.data?.user?.document?.url} target="_blank">View Document</a></p> 
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 py-4 px-4 rounded-lg shadow-lg overflow-x-auto mt-2 dark:text-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>RFQ NO.</TableHead>
              <TableHead>Product Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>Date Created</TableHead>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.user?.responses?.map((response, index) =>
                <TableRow key={index}>
                  <TableCell>{response.serialNo}</TableCell>
                  <TableCell>
                    <Image 
                      src={response.product.image.url}
                      className=" rounded-lg"
                      width={60}
                      height={60}
                    />
                  </TableCell>
                  <TableCell>{response.product.name}</TableCell>
                  <TableCell> {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
                    response.product.price )}</TableCell>
                  <TableCell>{response.vendor?.businessName}</TableCell>
                  <TableCell>{formatDate(response.createdAt)}</TableCell>
                  <TableCell><Link href={`/rfq-responses/${response._id}/profile`}><Button variant='outline' ><HiDotsHorizontal/></Button></Link></TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SingleRfq;