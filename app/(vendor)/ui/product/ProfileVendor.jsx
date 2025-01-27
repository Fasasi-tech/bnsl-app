'use client'
import React, {useState} from 'react'
import banner from './../../../../public/banner.png'
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { useRouter} from 'next/navigation'
import { useGetVendorSelfQuery } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import EditProfileVendor from './EditProfileVendor';
import { MdEdit } from 'react-icons/md';

const ProfileVendor = () => {

 const {data, isLoading, error} = useGetVendorSelfQuery()
 const [isEditing, setIsEditing] = useState(true)
   
 if (isLoading){
    return <Loader />
 }

 if(error){
  return <p>{error?.message}</p>
 }

  const result = data?.data?.user;

  // Check if the result is not null or undefined
  if (!result) {
    return <p>No vendor profile found. Please create a vendor profile first.</p>;
  }
  
  return (
    <>
        { isEditing ? (
            <div>
                <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>
                    <div className='flex items-start justify-start gap-4'>
                        <div className=" overflow-hidden border-2 border-orange-300">
                            <Image 
                                src={result?.logo?.url}
                                alt=''
                                width={120}
                                height={120}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <div className='flex gap-2 text-lg dark:text-white font-medium'>
                                <p>{result.businessName}</p>
                            </div>
                            <p className='text-sm  dark:text-white bg-orange-300 inline-block rounded-lg px-2 text-white'>{result.user.active ? "Active":"In-active"}</p>
                            <p  className='text-sm dark:text-white'>{result.user.group.name}</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white dark:bg-slate-800 py-4 px-4 rounded-lg shadow-lg overflow-x-auto mt-2 dark:text-white'>
                    <div className='flex items-center justify-between gap-2'><p className='text-xl font-semibold pb-2'>Business Information</p><Button variant='outline' className='text-gray-500 text-sm gap-2 dark:bg-orange-300 dark:text-white' onClick={() => setIsEditing(false)}><MdEdit /> Edit</Button></div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Business Name</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.businessName}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Business Address</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.address.state}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Country</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.address.country}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Business Address</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.address.businessAddress}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>State</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.address.state}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Account Name</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.bankAccountDetails.accountName}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Account Number</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.bankAccountDetails.accountNumber}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Bank Name</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.bankAccountDetails.bankName}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Role</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.user.group.name}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Vendor Class</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.vendor_class.map((vendor) => (<p>{vendor.name} </p>))}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Email</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.user.email}</p>
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-white'>Phone</p>
                            <p className='text-sm text-gray-600 font-semibold dark:text-white'>{result.phoneNumber}</p>
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
                            {data.data.user.user.permissions.map((perm) => (
                            <TableRow key={perm._id}>
                                <TableCell>{perm.name}</TableCell>
                                <TableCell>
                                <Checkbox
                                    checked={true} // Checkbox is checked because the permission is in data.user.permissions
                                    disabled={true} // Disable checkbox to indicate assigned status without editing
                                />
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

            </div>) 
        : <EditProfileVendor data={result} isEditing={isEditing} setIsEditing={setIsEditing} />}
    </>
 )
}

export default ProfileVendor