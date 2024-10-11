'use client'
import React, {useState} from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useExportUserMutation,  useListUsersQuery} from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader';
import { Button } from '@/components/ui/button';
import classNames from 'classnames';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { BiExport } from "react-icons/bi";
import debounce from 'lodash/debounce';
import BtnTrigger from './BtnTrigger';
import Actions from './Actions';
import { useSelector } from 'react-redux';
  


const Users = () => {

    const {userInfo} = useSelector((state) =>state.auth)
    // const [isClient, setIsClient] = useState(false);
    const ITEMS_PER_PAGE = 10;

    const [page, setPage] = useState(1)
    const [role, setRole] = useState('');
    const [sort, setSort] = useState('')
    const [search,  setSearch] = useState('')
    const [active, setActive] = useState(undefined);
    const {data:users, isLoading, isFetching, error} = useListUsersQuery({ page, limit: ITEMS_PER_PAGE, role, sort, search, active})
    const [exportUser, {isLoading:loadExcel,  data} ] = useExportUserMutation()

    if (isLoading){
        return <Loader/>
    }

    if (error){
        return ( <p>{error?.data?.message}</p>)
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
          console.error('Failed to export users:', err);
        }
      };

    //   useEffect(() => {
    //     setIsClient(true);
    //   }, []);
    
    //   if (!isClient) {
    //     return null; // Or return a loading spinner, etc.
    //   }


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
      
   
    const handleRoleChange = (value) => {
        setRole(value);
        setPage(1); // Reset to the first page when the role changes
    };

    const handleSortChange = (value) =>{
        setSort(value)
        setPage(1)
    }

    const clearFilter =()=>{
        setSort('')
        setRole('')
        setPage(1)
        setSearch('')
        setActive(false)
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleActiveChange = (value) => {
        setActive(value === 'true' ? true : value === 'false' ? false : undefined);
        setPage(1);
    };


    if (!users?.data.user){
        return <div className='text-green-300 text-lg font-bold pl-8'>No Users</div>
    }

    const totalPages= Math.ceil(users.data.user.result / ITEMS_PER_PAGE)
   
  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
        <div>
            <p className='font-medium text-lg font-sans text-gray-500'>Search Filters</p>
            <div className=' flex flex-wrap md:flex-nowrap  pt-8 pb-8 border-b border-gray-200 items-center gap-4 w-full'>
                <Select onValueChange={handleRoleChange} value={role}>
                    <SelectTrigger className="w-full md:w-1/4 ">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="none">Select a role</SelectItem> 
                        <SelectItem value="superAdmin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        
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
                { userInfo && (userInfo?.data?.user?.role==='admin'|| userInfo?.data?.user?.role==='superAdmin') ? <Button
                variant="destructive"
                >
                 <BtnTrigger />
            </Button>:''}
            
        </div>
       
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/3'>User</TableHead>
                    <TableHead className='w-1/6'>Role</TableHead>
                    <TableHead className='w-1/6'>Status</TableHead>
                    <TableHead className='w-1/6'>Created At</TableHead>
                    {userInfo && (userInfo?.data?.user?.role==='admin'|| userInfo?.data?.user?.role==='superAdmin') ?<TableHead className='w-1/6'>Actions</TableHead>:''}
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.data.user.getUsers.map((i, index) =>(
                <TableRow key={index}>
                    <TableCell  className='px-2 w-1/3'>
                        <div className='flex items-center gap-2'>
                            <Avatar>
                            <AvatarImage src={i?.image?.url} alt='avatar'/>
                            <AvatarFallback>{`${i?.firstName?.toUpperCase().slice(0,1)}${i?.lastName?.toUpperCase().slice(0,1)}`}</AvatarFallback>
                            </Avatar>
                            <div>
                                    <p className='text-gray-500  font-medium'>{`${i.firstName} ${i.lastName}`}</p>
                                    <p className='text-gray-400 text-sm'>{i.email}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="w-1/6 text-sm text-gray-400">{i.role}</TableCell>
                    <TableCell className='w-1/6 '><p className={`inline-block text-sm px-2 rounded-sm ${i.active===true ?'bg-green-100 text-green-300 ':'bg-red-100 text-red-300'}`}>{i.active === true ? 'Active' :'inActive'}</p></TableCell>
                    <TableCell className="w-1/6 text-sm text-gray-400">{formatDate(i.createdAt)}</TableCell>
                    {userInfo && (userInfo?.data?.user?.role==='admin'|| userInfo?.data?.user?.role==='superAdmin') ?<TableCell className="w-1/6 text-sm text-gray-400"><Actions userId={i._id}/></TableCell>:''}
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

export default Users