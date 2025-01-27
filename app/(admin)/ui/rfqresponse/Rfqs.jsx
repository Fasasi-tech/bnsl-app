'use client'
import React, {useState} from 'react'
import Loader from '../../../ui/utils/Loader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRfqsQuery } from '@/app/ui/utils/slices/usersApiSlice'
import AdminRfqs from '@/app/(vendor)/ui/rfq/AdminRfqs'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import classNames from 'classnames';
import Link from 'next/link'
import { HiDotsHorizontal } from 'react-icons/hi'
import { FaSearch } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import RFQTrigger from './RFQTrigger'


const Rfqs = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch]= useState('')
  const ITEMS_PER_PAGE= 10;
  const {data, isLoading, error, isFetching} = useRfqsQuery({page, limit:ITEMS_PER_PAGE, search})
  

  if(isLoading){
    return <Loader />
  }

  if (error){
    return <p className='font-semibold'>{error?.message}</p>
  }
  const result = data?.data?.user?.getRfq
  const totalPages= Math.ceil(data?.data?.user?.result /ITEMS_PER_PAGE)

  
    
    // if (result?.length === 0) {
    //     return <div className='font-bold text-orange-300'>No RFQs available.</div>;
    // }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleChange = (e) =>{
    setSearch(e.target.value)
  }

  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
        <div className='mb-4 mt-8 flex items-center justify-between'>
            <p className='text-lg md:text-xl font-semibold pb-2 px-4'>All RFQs</p>
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
                 
                    <RFQTrigger />
         

            </div>
        </div>
      <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/6'>Product</TableHead>
                    <TableHead className='w-1/6'>Created At</TableHead>
                    <TableHead className='w-1/6'>Actions</TableHead>
                   
                </TableRow>
            </TableHeader>
            <TableBody>
                {result?.map((i, index) =>(
                    
                    <TableRow key={index}>
                        <TableCell className="w-1/6 text-sm">
                        {i.product}
                        </TableCell>
                        <TableCell className="w-1/6 text-sm">
                            {formatDate(i.createdAt)}
                        </TableCell>
                        <TableCell className="w-1/6 text-sm">
                            {/* <AdminRfqs userId={i._id}/> */}
                            <Link href={`/rfqs/${i._id}/rfq`}><Button variant='outline'><HiDotsHorizontal /></Button></Link>
                        </TableCell>
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

export default Rfqs