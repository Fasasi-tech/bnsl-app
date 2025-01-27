'use client'
import React, {useState} from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useExportUserMutation,  useListUsersQuery} from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader';
import { Button } from '@/components/ui/button';
import classNames from 'classnames';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { BiExport } from "react-icons/bi";
import debounce from 'lodash/debounce';
import BtnTrigger from './BtnTrigger';
import Actions from './Actions';
import { useSelector } from 'react-redux';
import { useGroupQuery } from '@/app/ui/utils/slices/usersApiSlice';
  


const Users = () => {

    const {userInfo} = useSelector((state) =>state.auth)
    // const [isClient, setIsClient] = useState(false);
    const ITEMS_PER_PAGE = 10;

    const [page, setPage] = useState(1)
    const [group, setGroup] = useState('');
    const [sort, setSort] = useState('')
    const [search,  setSearch] = useState('')
    const [active, setActive] = useState(undefined);
    const {data:users, isLoading, isFetching, error} = useListUsersQuery({ page, limit: ITEMS_PER_PAGE, group, sort, search, active})
    const [exportUser, {isLoading:loadExcel,  data} ] = useExportUserMutation()
    const {data:groups, isLoading:loadingGroup, error:loadingError} = useGroupQuery()

    if (isLoading){
        return <Loader/>
    }

    if (error){
        return ( <p>{error?.message}</p>)
    }
    
    const handleClick = async () => {
        try {
          const { blob } = await exportUser().unwrap();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'users.xlsx'); // or whatever your file extension is
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (err) {
        
        }
      };

 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
      
   
    const handleGroupChange = (value) => {
        setGroup(value);
        setPage(1); // Reset to the first page when the role changes
    };

    const handleSortChange = (value) =>{
        setSort(value)
        setPage(1)
    }

    const clearFilter =()=>{
        setSort('')
        setGroup('')
        setPage(1)
        setSearch('')
        setActive(true)
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleActiveChange = (value) => {
        setActive(value === 'true' ? true : value === 'false' ? false : undefined);
        setPage(1);
    };


    if (!users?.data.user){
        return <div className='text-orange-300 text-lg font-bold pl-8'>No Users</div>
    }

    const totalPages= Math.ceil(users.data.user.result / ITEMS_PER_PAGE)
   
  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
        <div>
            <p className='font-medium text-lg font-sans text-gray-500'>Search Filters</p>
            <div className=' flex flex-wrap md:flex-nowrap  pt-8 pb-8 border-b border-gray-200 items-center gap-4 w-full'>
                <Select onValueChange={handleGroupChange} value={group}>
                    <SelectTrigger className="w-full md:w-1/4 ">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                            {
                            loadingGroup?(
                                <Loader />
                            ): loadingError ? (
                                <p>{loadingError.message}</p>
                            ):
                            groups?.data?.user?.map((i, index)=>(
                                <SelectItem key={index} value={i._id}>
                                {i.name}
                                </SelectItem>
                            ))
                            }
                        </SelectGroup>   
                    </SelectContent>
                </Select>
                <Select value={String(active)} onValueChange={handleActiveChange}>
                    <SelectTrigger className="md:w-1/4 w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                        <SelectItem value="undefined">All</SelectItem> {/* Add an option for both statuses */}
                    </SelectContent>
                </Select>
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
            <Button
                variant="destructive"
            >
                <p className='flex text-white items-center font-bold  gap-2' onClick={handleClick}>< BiExport className='text-white text-lg font-black '/>{isLoading? <p>Loading ...</p>:<p>Export</p>} </p>
            </Button>
                <Button
                variant="destructive"
                >
                 <BtnTrigger />
                </Button>
            
        </div>
       
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/6'>Email</TableHead>
                    <TableHead className='w-1/6'>Role</TableHead>
                    <TableHead className='w-1/6'>Status</TableHead>
                    <TableHead className='w-1/6'>Super Admin</TableHead>
                    {/* <TableHead className='w-1/6'>Permissions</TableHead> */}
                    <TableHead className='w-1/6'>Created At</TableHead>
                    <TableHead className='w-1/6'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.data.user.getUsers.map((i, index) =>(
                <TableRow key={index}>
                    <TableCell className='text-sm'>{i.email}</TableCell>
                    <TableCell className=" text-sm">{i?.group?.name}</TableCell>
                    <TableCell className='text-sm'><p className={`inline-block text-sm px-2 rounded-sm ${i.active===true ?'bg-orange-100 text-orange-300 ':'bg-red-100 text-red-300'}`}>{i.active === true ? 'Active' :'inActive'}</p></TableCell>
                    <TableCell className='text-sm '>{i.superAdmin === !!true ? 'True':'False'}</TableCell>
                    {/* <TableCell className=" text-sm ">{i.permissions}</TableCell> */}
                    <TableCell className=" text-sm ">{formatDate(i.createdAt)}</TableCell>
                    <TableCell className=" text-sm"><Actions userId={i._id}/></TableCell>
                </TableRow>
                )) }
            </TableBody> 
        </Table>
       
         <div className="flex justify-end gap-2 mt-4"> {/* Added flex and gap-2 for spacing */}
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-orange-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
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
                        'bg-orange-300 text-white': page === index + 1,
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
                className="bg-orange-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
                isLoading={isFetching}
            >
                <FaAngleRight />
            </button>
        </div>
    </div>
  )
}

export default Users