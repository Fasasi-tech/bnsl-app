'use client'
import React, {useState} from 'react'
import { useProductsQuery } from '@/app/ui/utils/slices/usersApiSlice'
import { useAllProductsQuery } from '@/app/ui/utils/slices/usersApiSlice'
import Image from 'next/image'
import Loader from '@/app/ui/utils/Loader'
import SkeleteonLoader from './SkeleteonLoader'
import { Button } from '@/components/ui/button';
import classNames from 'classnames';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Link from 'next/link'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Input } from '@/components/ui/input';

const Product = () => {
  const ITEMS_PER_PAGE = 36;
  const [page, setPage] = useState(1)
  const [search,  setSearch] = useState('')
  const [category,  setCategory] = useState('')
  const {data, isLoading, isFetching,  error} = useAllProductsQuery({page, limit:ITEMS_PER_PAGE, search, category})
  

  if (isLoading){
    return <Loader />
  }

  if (error){
    return <p className='text-green-300 font-semibold '>{`${error.message}`}</p>
  }

  const handleCategoryChange = (value) =>{
    setCategory(value)
    setPage(1)
  }

  const clearFilter =()=>{
    setPage(1)
    setSearch('')
    setCategory('')

}



const handleChange = (e) => {
  setSearch(e.target.value);
};



  const totalPages= Math.ceil(data?.data?.user.result / ITEMS_PER_PAGE)

  const blurs='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACkAKQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAXEAEBAQEAAAAAAAAAAAAAAAAAAREC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AYBDIIyAiMlAABVQ4mHEVUOFDgKACKZAACBKgAIAAAIgQhkRaB6RaNUMFogLOJhxFXDiYqCmZGgACAFRStVBpaWloHoLQBaNLS0Q9LS0tA9LS0tUVpyp04KuKiIqILiomKgpgBAFTKgVTadRaoLS0rS0D0J0CHpaWjQFpWlpaB6WloUVqoiKgLi4iLiC4qJioKZgIEmqqaCaiqqKom1NotTaB6E6AWQJEBWikoARgcXERcBcXExcFXFQpFSADPAgmorSooM+mdadM+gZ1Fq+kVVLQQBoRhGSIyUI4DkA4uQpF8wFSNOYnmNOYKci5CkXIBYMVgxBFiK0sTYDHpn026jLqAy6Z1r1GdiqkHgBZKJGSGHgxQsOQ8VIAkXzCkacwD5jSQpFyAci5BIqQCwYrBgM7EWNbE2IrHqMuo36jPqKMOoixr1EWAzwLwCjBh4MRksGHh4oUipBIuQBI0kTI0kA5GkhcxcgHIqQSKkAsGKwYDOxNjSxNgMeoz6jaxn1BWNiLG1iLAZ4F4ARgwwiFh4ZyKFIuQpFyAci5CkXICpFyFIuQDkVIUipAGFigCLEWNLE2AysR1GtiLAY2JsaWJsFRgVgBiABDhwoqAcVCioCo0iIuAuLiYuCKhwooADIVNTV1NBnUVpUUGdTYupoJBgHMYAHDgAKioAC40gCouLgALhwBAwAKmpoAIqKACKmgAQAB/9k='
  
  return (
    <div className='w-full bg-white dark:bg-slate-800 shadow-lg rounded-lg py-8 mb-4 px-2  mx-auto'>
      <div>
            <p className='font-medium text-lg font-sans text-gray-500'>Search Filters</p>
            <div className=' flex flex-wrap md:flex-nowrap  pt-8 pb-8  items-center gap-4 w-full'>
              <Select onValueChange={handleCategoryChange} value={category}>
                  <SelectTrigger className="w-full md:w-1/4 ">
                      <SelectValue placeholder="category" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="none">Select a category</SelectItem> 
                      <SelectItem value="Feed">Feed</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Vet">Vet</SelectItem>
                      <SelectItem value="Service">Service</SelectItem> 
                  </SelectContent>
              </Select>
              <form>
                <Input
                  placeholder='Search'
                  className='w-full md:w-72'
                  value={search}
                  onChange={handleChange}
                />
            </form>  
              <div className='md:w-1/4 w-full'>
                  <Button variant='destructive' className='w-full lg:w-[50%] ' onClick={clearFilter}>Clear Filter</Button>
              </div>
          </div>
      </div>
      <div className='grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-4 px-8 py-4 border border-b-1'>
      {
        
        data.data.user.products.map((product, index) =>(
          <div className='my-4  max-h-72 ' key={index}>
        
            <Link href={`/products/${product._id}/product`}>
              <Image
                src={product?.image?.url}
                alt='image'
                width={300}
                height={300}
                placeholder="blur"
                blurDataURL={blurs}
                className='h-[90%]'
              />
              <p className=' text-sm text-gray-500 px-2'>{product.name.length <=30 ? product.name : product.name.slice(0, 27) + '...'}</p>
              <p className='text-sm text-gray-500 px-2 font-semibold '>
                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
                  product.price )}
                </p>
            </Link>
            
          </div>

        ))
      }
      </div>
      <div className="flex justify-end gap-2 mt-4">
        {/* Previous button */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-green-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
          isLoading={isFetching}
        >
          <FaAngleLeft />
        </button>

        {/* Calculate the start and end pages to display only 3 buttons */}
        {(() => {
          const startPage = Math.max(1, page - 1);
          const endPage = Math.min(totalPages, startPage + 2);

          return [...Array(endPage - startPage + 1)].map((_, index) => {
            const currentPage = startPage + index;
            return (
              <Button
                variant="secondary"
                key={currentPage}
                onClick={() => setPage(currentPage)}
                className={classNames(
                  'px-3 rounded',
                  {
                    'bg-green-300 text-white': page === currentPage,
                    'bg-gray-200': page !== currentPage,
                  },
                  'mx-1'
                )}
                isLoading={isFetching}
              >
                {currentPage}
              </Button>
            );
          });
        })()}

        {/* Next button */}
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

export default Product