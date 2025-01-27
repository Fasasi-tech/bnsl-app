'use client'
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog"
import { useSingleVendorHistoryQuery } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';

const AuditLog = ({id}) => {

  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useSingleVendorHistoryQuery(id, { skip: !open });

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
};


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline'>View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-orange-300'>Audit Log</DialogTitle>
        </DialogHeader>
        {isLoading ? (
            <Loader />
        ) : error ? (
            <p className='font-bold text-red-500'>Error loading data</p>
        ) : (
            <div> 
                <p className='font-bold text-orange-300  border-orange-300 border-b'>Current Details</p>
                <div className='pt-2'>
                  <p className='text-gray-500  pb-2 '><span className='text-gray-400 font-bold'>Business Name: </span>  {data?.data?.user?.currentDetails?.businessName}</p>
                  <p className='text-gray-500  pb-2 '><span className='text-gray-400 font-bold'>Phone: </span>{data?.data?.user?.currentDetails?.phoneNumber}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Account Name: </span>{data?.data?.user?.currentDetails?.bankAccountDetails?.accountName}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Account Number: </span>{data?.data?.user?.currentDetails?.bankAccountDetails?.accountNumber}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Bank Name: </span>{data?.data?.user?.currentDetails?.bankAccountDetails?.bankName}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>State: </span>{data?.data?.user?.currentDetails?.address?.state}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Country: </span>{data?.data?.user?.currentDetails?.address?.country}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Business Address: </span>{data?.data?.user?.currentDetails?.address?.businessAddress}</p>
                </div>
                
                <p className='font-bold text-orange-300  border-orange-300 border-b'>Previous Details</p>
                <div className='pt-2'>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Business Name: </span>  {data?.data?.user?.previousDetails?.businessName}</p>
                  <p className='text-gray-500  pb-2 '><span className='text-gray-400 font-bold'>Phone: </span>{data?.data?.user?.previousDetails?.phoneNumber}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Account Name: </span>{data?.data?.user?.previousDetails?.bankAccountDetails?.accountName}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Account Number: </span>{data?.data?.user?.previousDetails?.bankAccountDetails?.accountNumber}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Bank Name: </span>{data?.data?.user?.previousDetails?.bankAccountDetails?.bankName}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>State: </span>{data?.data?.user?.previousDetails?.address?.state}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Country: </span>{data?.data?.user?.previousDetails?.address?.country}</p>
                  <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Business Address: </span>{data?.data?.user?.previousDetails?.address?.businessAddress}</p>
                </div>
            </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AuditLog