'use client'
import VendorProduct from '@/app/(admin)/ui/vendor/VendorProduct';
import VendorProfile from '@/app/(admin)/ui/vendor/VendorProfile';
import Loader from '@/app/ui/utils/Loader';
import { useSingleVendorQuery, useVendorProductadminQuery } from '@/app/ui/utils/slices/usersApiSlice';
import React, {useState} from 'react'

const page = ({params}) => {
    const {id} = params;
    const ITEMS_PER_PAGE = 5;
    const [page, setPage] = useState(1)
    const {data, isLoading, error} = useSingleVendorQuery(id)
    const {data:vendor, isLoading:vendorLoading, error:vendorError,  isFetching} = useVendorProductadminQuery ({id, page, limit:ITEMS_PER_PAGE})

    if (isLoading || vendorLoading){
        return <Loader />
    }

    if (error || vendorError){
        return <p className='font-bold text-green-300'>error</p>
    }

    if (!vendor.data.user){
      return <div className='text-green-300 text-lg font-bold pl-8'>No Vendor</div>
    }
    
    const totalPages= Math.ceil(vendor.data.user.result / ITEMS_PER_PAGE)

  return (
    <div  className='px-4 my-4 lg:px-8'>
        <VendorProfile data={data} product={vendor} totalPages={totalPages} page={page} setPage={setPage} isFetching={ isFetching} />
    </div>
  )
}

export default page