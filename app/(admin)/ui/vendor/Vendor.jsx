'use client'
import { useVendorsQuery } from '@/app/ui/utils/slices/usersApiSlice';
import React, {useState}  from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import Loader from '@/app/ui/utils/Loader';
import { IoEyeOutline } from 'react-icons/io5';
import VendorActions from './VendorActions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import classNames from 'classnames';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

const Vendor = () => {
    const ITEMS_PER_PAGE = 10;

    const [page, setPage] = useState(1)
    const [search,  setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [vendor_class, setVendorClass] = useState('')
    const {data:users, isLoading, isFetching, error} = useVendorsQuery({page, limit:ITEMS_PER_PAGE, search, vendor_class})
 
    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p className='text-green-300 font-semibold '>{`${error.message}`}</p>
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
      


    if (!users?.data.user){
        return <div className='text-green-300 text-lg font-bold'>No Users</div>
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSortChange = (value) =>{
        setSort(value)
        setPage(1)
    }

    const handleCategoryChange = (value) =>{
        setVendorClass(value)
        setPage(1)
    }

    const clearFilter =()=>{
        setSort('')
        setPage(1)
        setSearch('')
        setVendorClass('')

    }

    const totalPages= Math.ceil(users.data.user.result / ITEMS_PER_PAGE)
  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
        <div>
            <p className='font-medium text-lg font-sans text-gray-500'>Search Filters</p>
            <div className=' flex flex-wrap md:flex-nowrap  pt-8 pb-8 border-b border-gray-200 items-center gap-4 w-full'>
                <Select onValueChange={handleSortChange} value={sort}>
                    <SelectTrigger className="md:w-1/4 w-full">
                        <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="none">Sort</SelectItem> 
                        <SelectItem value="createdAt">Asc</SelectItem>
                        <SelectItem value="-createdAt">Desc</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={handleCategoryChange} value={vendor_class}>
                    <SelectTrigger className="w-full md:w-1/4 ">
                        <SelectValue placeholder="category" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="none">Select a category</SelectItem> 
                        <SelectItem value="Feed">Feed</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Vet">Vet</SelectItem>
                        <SelectItem value="Service">Service</SelectItem>
                        
                    </SelectContent>
                </Select>
                <div className='md:w-1/4 w-full'>
                    <Button variant='destructive' className='w-full lg:w-[50%] ' onClick={clearFilter}>Clear Filter</Button>
                </div>


            </div>
        </div>

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
                <TableHead className='w-1/6'>Logo</TableHead>
                <TableHead className='w-1/6'>Business Name</TableHead>
                <TableHead className='w-1/6'>Category</TableHead>
                <TableHead className='w-1/6'>Email</TableHead>
                <TableHead className='w-1/6'>Created At</TableHead>
                <TableHead className='w-1/6'>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.data.user.getVendors.map((i, index) =>(
            <TableRow key={index}>
                <TableCell  className='px-2 w-1/6'>
                    <div className='flex items-center gap-2'>
                        <Avatar>
                        <AvatarImage src={i?.logo?.url} alt='avatar'/>
                        <AvatarFallback className='bg-green-300' />
                        </Avatar>
                    </div>
                </TableCell>
                <TableCell className="w-1/6 text-sm text-gray-400">{i.name}</TableCell>
                <TableCell className="w-1/6 text-sm text-gray-400">{i.vendor_class}</TableCell>
                <TableCell className="w-1/6 text-sm text-gray-400">{i.user.email}</TableCell>
                <TableCell className="w-1/6 text-sm text-gray-400">{formatDate(i.createdAt)}</TableCell>
                <TableCell><VendorActions userId={i._id}/></TableCell>
      
            </TableRow>
            )) }
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

export default Vendor