'use client'
import React, {useState} from 'react'
import { useCustomerprofileQuery } from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader';
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import EditCustomer from '@/app/(vendor)/ui/customers/EditCustomer';
import { Button } from '@/components/ui/button'
import { MdEdit } from 'react-icons/md'
import EditProfile from './EditProfile';

const CustomerProfile = () => {
    const {data, error, isLoading} = useCustomerprofileQuery();
    const [isEditing, setIsEditing] = useState(true)
   

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p>{error.message}</p> 
    }

    const result = data.data.user


    return (
        <>
        {isEditing ? (
    <div>
        <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
             <div className='flex items-start justify-start gap-4'>
                <div>
                    <Image 
                        src={result?.image?.url}
                        alt={`${result.firstName} ${result.lastName}`}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-orange-300 max-w-full h-auto "
                    />
                </div>
                <div>
                    <div className='flex gap-2 text-xl dark:text-white font-medium'>
                        <p>{result.firstName}</p>
                        <p>{result.lastName}</p>
                    </div>
                    <p className='text-sm text-gray-600 dark:text-white'>{result.user.active ? "Active":"In-active"}</p>
                    <p  className='text-sm text-gray-600 dark:text-white'>{result.user.group.name}</p>
                </div>
            </div>
        </div>
        <div className='bg-white dark:bg-slate-800 py-4 px-4 rounded-lg shadow-lg overflow-x-auto mt-2 dark:text-white'>
            <div className='flex items-center justify-between gap-2'><p className='text-xl font-semibold pb-2'>Personal Information</p><Button variant='outline' className='text-gray-500 text-sm gap-2 dark:bg-orange-300 dark:text-white' onClick={() => setIsEditing(false)}><MdEdit /> Edit</Button></div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>First Name</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.firstName}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>Last Name</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.lastName}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>Phone Number</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.phoneNumber}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>Email</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.user.email}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>Status</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.user.active? "Active": "In-Active"}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>SuperAdmin</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.user.superAdmin ? "Super-Admin":"False"}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>Role</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.user.group.name}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>Marital Status</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.maritalStatus}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>Gender</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.gender}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>State</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.address.state}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-600 dark:text-white'>Country</p>
                    <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.address.country}</p>
                </div>
            </div>    
        </div>
        <div className='bg-white dark:bg-slate-800 py-4 px-4 rounded-lg shadow-lg overflow-x-auto mt-2 dark:text-white'>
            <div className='flex items-center justify-between gap-2'><p className='text-xl font-semibold pb-2'>Permissions</p></div>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Permission Name</TableHead>
                    <TableHead>Assigned</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {result.user.permissions.map((perm) => (
                    <TableRow key={perm._id}>
                        <TableCell>{perm.name}</TableCell>
                        <TableCell>
                        <Checkbox
                            checked={true} // Checkbox is checked because the permission is in result.user.permissions
                            disabled={true} // Disable checkbox to indicate assigned status without editing
                        />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>): <EditProfile data={result} isEditing={isEditing} setIsEditing={setIsEditing} />}
    </>
  )
}

export default CustomerProfile