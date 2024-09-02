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

console.log(data, 'data')
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline'>View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-green-300'>Audit Log</DialogTitle>
        </DialogHeader>
        {/* <DialogDescription>
         
        </DialogDescription> */}
        {isLoading ? (
                    <Loader />
                ) : error ? (
                    <p className='font-bold text-red-500'>Error loading data</p>
                ) : (
                    <div>
                        
                        <p className='font-bold text-green-300  border-green-300 border-b'>Current Details</p>
                        <div className='pt-2'>
                          <p className='text-gray-500  pb-2 '><span className='text-gray-400 font-bold'>Business Name: </span>  {data?.data?.user?.currentDetails?.name}</p>
                          <p className='text-gray-500  pb-2 '><span className='text-gray-400 font-bold'>Description: </span>{data?.data?.user?.currentDetails?.description}</p>
                          <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Vendor Class: </span>{data?.data?.user?.currentDetails?.vendor_class}</p>
                        </div>
                        
                        <p className='font-bold text-green-300  border-green-300 border-b'>Previous Details</p>
                        <div className='pt-2'>
                          <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Business Name: </span> {data?.data?.user?.previousDetails?.name}</p>
                          <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Description: </span> {data?.data?.user?.previousDetails?.description}</p>
                          <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Vendor Class: </span> {data?.data?.user?.previousDetails?.vendor_class}</p>
                        </div>
                    </div>
                )}
      </DialogContent>
    </Dialog>
  )
}

export default AuditLog