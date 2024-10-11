'use client'
import React, {useState} from 'react'
import Loader from '@/app/ui/utils/Loader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetVendorProductQuery } from '@/app/ui/utils/slices/usersApiSlice'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import ProductActions from './ProductActions'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Button } from '@/components/ui/button'
import classNames from 'classnames';
import { useRouter } from 'next/navigation'


const Product = () => {
    const router = useRouter()
    const ITEMS_PER_PAGE = 10;
    const [search,  setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [category, setCategory] = useState('')
    const {data, isLoading, isFetching, error} = useGetVendorProductQuery({page, limit:ITEMS_PER_PAGE, category, search })

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p>{error?.data?.message}</p>
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };

      const clearFilter =()=>{
        setPage(1)
        setSearch('')
        
    }

      const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleCategoryChange = (value) => {
        setCategory(value);
        setPage(1); // Reset to the first page when the role changes
    };

    const totalPages= Math.ceil(data.data.user.result / ITEMS_PER_PAGE)

  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
        <div>
            <p className='font-medium text-lg font-sans text-gray-500'>Search Filters</p>
            <div className='flex flex-wrap lg:flex-nowrap justify-between pt-8 pb-8 border-b border-gray-200 items-center gap-4 w-full'>
                <Select onValueChange={handleCategoryChange} value={category}>
                    <SelectTrigger className="w-full md:w-1/4 ">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem >Select a Category</SelectItem> 
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Vet">Vet</SelectItem>
                        <SelectItem value="Feed">Feed</SelectItem>
                    </SelectContent>
                </Select>
               <div className='flex flex-wrap lg:flex-nowrap gap-2 items-center justify-start'>
                    <div >
                            <form>
                                <Input
                                    placeholder='Search'
                                    className='w-72'
                                    value={search}
                                    onChange={handleChange}
                                />
                            </form> 
                        </div>
                        <Button variant='destructive' onClick={() => router.push('/add-product')}>Add Product</Button>
                </div>
                
            </div>
            
        </div>
       <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/6'>PRODUCT</TableHead>
                    <TableHead className='w-1/6'>CATEGORY</TableHead>
                    <TableHead className='w-1/6'>CREDIT TERM</TableHead>
                    <TableHead className='w-1/6'>LEAD TIME</TableHead>
                    <TableHead className='w-1/6'>CREATED AT</TableHead>
                    <TableHead className='w-1/6'>CREATED BY</TableHead>
                    <TableHead className='w-1/6'>ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.data.user.getProduct.map((i,index) =>(
                    <TableRow key={index}>
                        <TableCell className='px-2 w-1/6'>
                            <div className='flex items-center gap-2'>
                                <Avatar>
                                <AvatarImage src={i?.image?.url} alt='avatar'/>
                                </Avatar>
                                <div>
                                    <p className='text-gray-400 text-sm'>{i.name}</p>
                                    {/* <p className='text-gray-500  font-medium'>{`${i.description}`}</p> */}
                                </div>
                            </div> 
                        </TableCell>
                        <TableCell>
                            {i.category}
                        </TableCell>
                        <TableCell>
                            <div className='flex items-center justify-start'>
                                <p>{i.creditTerm.value}</p>
                                <p>{i.creditTerm.unit}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='flex items-center justify-start'>
                                <p>{i.leadTime.value}</p>
                                <p>{i.leadTime.unit}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            {formatDate(i.createdAt)}
                        </TableCell>
                        <TableCell>
                            {i.createdBy}
                        </TableCell>
                        <TableCell>
                            <ProductActions userId={i._id}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
       </Table>
       <div className="flex justify-end gap-2 mt-4"> {/* Added flex and gap-2 for spacing */}
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-green-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
                isLoading={isFetching}
            >
                <FaAngleLeft />
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <Button
                    variant="secondary"
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={classNames(
                    ' px-3 rounded',
                    {
                        'bg-green-300 text-white': page === index + 1,
                        'bg-gray-200': page !== index + 1,
                    },
                    'mx-1' // Added margin-x for spacing between buttons
            )}
                    isLoading={isFetching}
                >
                    {index + 1}
                </Button>
            ))}
            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="bg-green-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
                isLoading={isFetching}
            >
                <FaAngleRight />
            </button>
        </div>
    </div>
  )
}

export default Product