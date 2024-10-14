'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { HiDotsHorizontal } from "react-icons/hi";
import { useSingleRfqResponseQuery } from '../../../ui/utils/slices/usersApiSlice';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import Loader from '../../../ui/utils/Loader';

const RFQresponseActions = ({userId}) => {
    const [isOpen, setIsOpen] = useState(false)
    const {data, isLoading, error} = useSingleRfqResponseQuery(userId, {skip:!isOpen})

  return (
   <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button variant='outline'>
                <HiDotsHorizontal />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                RFQ Response Details
            </DialogHeader>
            {isLoading ? (
                <Loader />
            ): error ? (
                <p className='text-red-500 font-semibold'> {error?.data?.message || "Something went wrong"}</p>
            ) :(
            <div>
                <p className='text-orange-500 bg-orange-100 p-2 rounded-lg '>RFQ Response</p>
                <p className='text-sm pb-2 pt-4'>Information: {data?.data?.user?.AdditionalInfo}</p>
                <p  className='text-sm pb-2'>Customer's Email: {data?.data?.user?.customerEmail}</p>
                <p  className='text-sm pb-2'>Product: {data?.data?.user?.product.name}</p>
                {/* <p>Product: {data?.data?.user?.data.user.attachment.url}</p> */}
                <div className='mt-4'>
                    <a
                        href={data?.data?.user?.attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 rounded-md text-sm  p-2 bg-blue-300 hover:text-blue-800"
                    >
                        View Document 

                    </a>
                </div>
                
            </div>) }
        </DialogContent>
   </Dialog>
  )
}

export default RFQresponseActions