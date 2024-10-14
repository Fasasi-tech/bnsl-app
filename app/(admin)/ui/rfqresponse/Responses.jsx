'use client'
import React, {useState} from 'react'
import { useRfqResponsesQuery } from '../../../ui/utils/slices/usersApiSlice'
import Loader from '../../../ui/utils/Loader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import RFQresponseActions from './RFQresponseActions'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import classNames from 'classnames';

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
    const result= data?.data?.user?.Rfqs
    const totalPages= Math.ceil(data?.data?.user?.countResult / ITEMS_PER_PAGE)

    const batchSize = 5; // Number of pages to show in each batch
    const startPage = Math.floor((page - 1) / batchSize) * batchSize + 1;
    const endPage = Math.min(startPage + batchSize - 1, totalPages);
    
    if (result?.length === 0) {
        return <div className='font-bold text-orange-300'>No RFQs available.</div>;
    }

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
                                {i?.product?.name}
                            </TableCell>
                            <TableCell className='w-1/6'>
                                {i?.product?.category}
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

export default Responses