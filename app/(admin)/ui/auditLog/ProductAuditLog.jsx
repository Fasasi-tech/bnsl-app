'use client'
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog"
import Loader from '@/app/ui/utils/Loader';
import { useSingleProductHistoryQuery } from '@/app/ui/utils/slices/usersApiSlice';

const ProductAuditLog = ({id}) => {

    const [open, setOpen] = useState(false);
    const {data, isLoading, error} = useSingleProductHistoryQuery(id, { skip: !open });

    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
    };

    const dateString = (dateString) =>{
      const date = new Date(dateString)
      const options={
          weekday:"long", year:"numeric", month:"long", day:"numeric", 
      }

      return date.toLocaleString("en-US", options)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline'>View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-orange-300'>Audit Log</DialogTitle>
        </DialogHeader>
        {/* <DialogDescription>
         
        </DialogDescription> */}
        {isLoading ? (
                    <Loader />
                ) : error ? (
                    <p className='font-bold text-red-500'>Error loading data</p>
                ) : (
                    <div>
                      <p className='font-bold text-orange-300  border-orange-300 border-b'>Previous Details</p>
                      <div className='pt-2'>
                        <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>Product Name: </span> {data?.data?.user?.previousDetails?.name}</p>
                        <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>price: </span>  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
                            data?.data?.user?.previousDetails?.price )}
                        </p>
                        <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>vendor: </span> {data?.data?.user?.updatedBy}</p>
                        <p className=' text-gray-500 pb-2 '><span className='text-gray-400 font-bold'>created at: </span> {dateString(data?.data?.user?.previousDetails?.createdAt)}</p>
                      </div>
                    </div>
                )}
      </DialogContent>
    </Dialog>
  )
}

export default ProductAuditLog