'use client'
import Image from 'next/image'
import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';

const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

 


const ResponsesProfile = ({data}) => {
    const router = useRouter()

    const blurs='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACkAKQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAXEAEBAQEAAAAAAAAAAAAAAAAAAREC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AYBDIIyAiMlAABVQ4mHEVUOFDgKACKZAACBKgAIAAAIgQhkRaB6RaNUMFogLOJhxFXDiYqCmZGgACAFRStVBpaWloHoLQBaNLS0Q9LS0tA9LS0tUVpyp04KuKiIqILiomKgpgBAFTKgVTadRaoLS0rS0D0J0CHpaWjQFpWlpaB6WloUVqoiKgLi4iLiC4qJioKZgIEmqqaCaiqqKom1NotTaB6E6AWQJEBWikoARgcXERcBcXExcFXFQpFSADPAgmorSooM+mdadM+gZ1Fq+kVVLQQBoRhGSIyUI4DkA4uQpF8wFSNOYnmNOYKci5CkXIBYMVgxBFiK0sTYDHpn026jLqAy6Z1r1GdiqkHgBZKJGSGHgxQsOQ8VIAkXzCkacwD5jSQpFyAci5BIqQCwYrBgM7EWNbE2IrHqMuo36jPqKMOoixr1EWAzwLwCjBh4MRksGHh4oUipBIuQBI0kTI0kA5GkhcxcgHIqQSKkAsGKwYDOxNjSxNgMeoz6jaxn1BWNiLG1iLAZ4F4ARgwwiFh4ZyKFIuQpFyAci5CkXICpFyFIuQDkVIUipAGFigCLEWNLE2AysR1GtiLAY2JsaWJsFRgVgBiABDhwoqAcVCioCo0iIuAuLiYuCKhwooADIVNTV1NBnUVpUUGdTYupoJBgHMYAHDgAKioAC40gCouLgALhwBAwAKmpoAIqKACKmgAQAB/9k='

  return (
    <div>
        <div className='mb-2'>
          <Button variant='outline'className='text-2xl text-orange-300' onClick={() =>router.back()}><IoMdArrowBack /></Button>            
        </div> 
        <div className='w-full py-2 md:py-4 lg:py-16 px-2 md:px-4 lg:px-40  bg-white  dark:bg-slate-800 shadow-lg rounded-lg   mx-auto'>
            <div className='grid grid-cols-2 gap-4'>
                <div >
                    <Image
                        alt='product-img'
                        src={data.product.image.url}
                        width={400}
                        height={400}
                        className='rounded-lg'
                        placeholder="blur"
                        blurDataURL={blurs}
                    />    
                </div>
                <div className=''>
                    <div className='border  border-t-0 border-x-0 pb-2 border-b  border-gray-500'>
                        <p className='text-sm  md:text-lg lg:text-2xl font-semibold'>{data.product.name}</p>
                        <p className='text-sm md:text-lg lg:text-2xl font-semibold pt-2'>
                         {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
                            data.product.price )}
                        </p>
                        <div className='flex items-center gap-2 mt-4'>
                            <Avatar>
                                <AvatarImage src={data?.vendor?.logo?.url} alt='vendor-image' />
                            </Avatar>
                            <p>{data?.vendor?.businessName}</p>
                        </div>
                    </div>
                    <div className='mt-2 flex items-center  justify-start gap-4'>
                        <p className=' pb-2'>credit Term: {data?.product?.creditTerm?.value}{data?.product?.creditTerm?.unit}</p>
                        <p className=' pb-2'>Lead Time: {data?.product?.leadTime?.value}{data?.product?.leadTime?.unit}</p>
                    </div>
                    <div >
                        <div className='mt-4' dangerouslySetInnerHTML={{ __html: decodeHtml(data.product.productDetails) }} />
                    </div>     
                </div>
            </div>

        </div>

    </div>
  )
}

export default ResponsesProfile