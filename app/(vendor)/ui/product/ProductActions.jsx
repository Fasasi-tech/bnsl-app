'use client'
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { HiDotsHorizontal } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import Link from 'next/link';
import { useSingleProductsQuery } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';
import ProductDetailsPage from './ProductDetailsPage';
import VendorSingleDetails from './VendorSingleDetails';
const ProductActions = ({userId}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {data, isLoading, error} = useSingleProductsQuery(userId, {skip: !isOpen})
  return (
 

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'><HiDotsHorizontal /></Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[90vw] lg:max-w-[60vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
              Product Details
          </DialogTitle>
          <DialogDescription>
            Detailed Information about the selected product.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className='text-red-500 font-semibold'>{error?.data?.message}</p>
        ):(
          <div>
            {/* <ProductDetailsPage data={data?.data?.user?.productDetails} decodeHtml={decodeHtml}/> */}
            <VendorSingleDetails data={data?.data?.user} />
          </div>

        )}
      </DialogContent>

    </Dialog>
  )
}

export default ProductActions