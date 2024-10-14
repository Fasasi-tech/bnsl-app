'use client'
import React, {useState} from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import classNames from 'classnames';

const VendorProduct = ({product, totalPages, page, setPage,  isFetching}) => {
    const result=product?.data?.user.getProducts;
 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };

    
  return (
    <div className=" rounded-lg shadow-md bg-white w-full mb-4 p-8">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/6'>Image</TableHead>
                    <TableHead className='w-1/6'>Name</TableHead>
                    <TableHead className='w-1/6'>Price</TableHead>
                    <TableHead className='w-1/6'>Created By</TableHead>
                    <TableHead className='w-1/6'>Category</TableHead>
                    <TableHead className='w-1/6'>Created At</TableHead>
                    
                </TableRow>
            </TableHeader>
            <TableBody>
             {result.map((r, i) =>(
                <TableRow key={i}>
                    <TableCell  className='px-2 w-1/3'>
                        <div className='flex items-center gap-2'>
                            <Avatar>
                            <AvatarImage src={r?.image?.url} alt='avatar'/>
                            <AvatarFallback>{`${r?.name?.slice(0,1)}`}</AvatarFallback>
                            </Avatar>
                        </div>
                    </TableCell>
                    <TableCell className="w-1/6 text-sm text-gray-400">{r.name}</TableCell>
                    <TableCell className="w-1/6 text-sm text-gray-400">{r.price}</TableCell>
                    <TableCell className="w-1/6 text-sm text-gray-400">{r.createdBy}</TableCell>

                    <TableCell className="w-1/6 text-sm text-gray-400">{r.category}</TableCell>
                    <TableCell className="w-1/6 text-sm text-gray-400">{formatDate(r.createdAt)}</TableCell>
                   
                </TableRow>
                ))}
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

export default VendorProduct