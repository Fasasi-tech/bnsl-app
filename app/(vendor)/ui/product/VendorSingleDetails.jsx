'use client'
import React, {useState} from 'react'
import ProductDetailsPage from './ProductDetailsPage';
import Image from 'next/image'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ReviewsPage from './ReviewsPage';
import ReviewPage from './ReviewPage';


const VendorSingleDetails = ({data}) => {

    const router = useRouter()
    const [active, setActive] = useState('productDetails')

    const decodeHtml = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
      };

      const blurs='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACkAKQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAXEAEBAQEAAAAAAAAAAAAAAAAAAREC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AYBDIIyAiMlAABVQ4mHEVUOFDgKACKZAACBKgAIAAAIgQhkRaB6RaNUMFogLOJhxFXDiYqCmZGgACAFRStVBpaWloHoLQBaNLS0Q9LS0tA9LS0tUVpyp04KuKiIqILiomKgpgBAFTKgVTadRaoLS0rS0D0J0CHpaWjQFpWlpaB6WloUVqoiKgLi4iLiC4qJioKZgIEmqqaCaiqqKom1NotTaB6E6AWQJEBWikoARgcXERcBcXExcFXFQpFSADPAgmorSooM+mdadM+gZ1Fq+kVVLQQBoRhGSIyUI4DkA4uQpF8wFSNOYnmNOYKci5CkXIBYMVgxBFiK0sTYDHpn026jLqAy6Z1r1GdiqkHgBZKJGSGHgxQsOQ8VIAkXzCkacwD5jSQpFyAci5BIqQCwYrBgM7EWNbE2IrHqMuo36jPqKMOoixr1EWAzwLwCjBh4MRksGHh4oUipBIuQBI0kTI0kA5GkhcxcgHIqQSKkAsGKwYDOxNjSxNgMeoz6jaxn1BWNiLG1iLAZ4F4ARgwwiFh4ZyKFIuQpFyAci5CkXICpFyFIuQDkVIUipAGFigCLEWNLE2AysR1GtiLAY2JsaWJsFRgVgBiABDhwoqAcVCioCo0iIuAuLiYuCKhwooADIVNTV1NBnUVpUUGdTYupoJBgHMYAHDgAKioAC40gCouLgALhwBAwAKmpoAIqKACKmgAQAB/9k='

  return (
    <>
         <div className='w-full py-16 px-4 bg-white  dark:bg-slate-800 shadow-lg rounded-lg   mx-auto'>
            <div className='grid grid-cols-2 gap-4'>
                <div >
                    <Image
                        alt='product-img'
                        src={data.image.url}
                        width={200}
                        height={200}
                        className='rounded-lg'
                        placeholder="blur"
                        blurDataURL={blurs}
                    />
                    
                
                    
                </div>
                <div className=''>
                    <div className='border  border-t-0 border-x-0 pb-8 border-b border-dashed border-gray-500'>
                        <p className='text-xl font-semibold font-mono'>{data.name}</p>
                        <p className='text-xl font-semibold mt-8'>
                        Price: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
                            data.price )}
                        </p>
                        <div className='flex items-center gap-2 mt-4'>
                            <Avatar>
                                <AvatarImage src={data.vendorDetails.logo.url} alt='vendor-image' />
                            </Avatar>
                            <p>{data.vendorDetails.name}</p>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <p className='text-gray-400 pb-2'>credit Term: {data?.creditTerm?.value}{data?.creditTerm?.unit}</p>
                        <p className='text-gray-400 pb-2'>Lead Time: {data?.leadTime?.value}{data?.leadTime?.unit}</p>
                    </div>
                    
                </div>
            </div>

        </div>
        <div className='bg-white rounded-lg p-4 mt-2 shadow-lg'>
            <div className='flex items-center justify-start gap-8'>
                <button
                    className={active === 'productDetails' ? 'font-semibold border-b-2 border-black inline-block' : ''}
                    onClick={() => setActive('productDetails')}
                >
                    Product Details
                </button>
                <button className={active ==='reviews' ? 'font-semibold border-b-2 border-black inline-block':''} onClick={() => setActive('reviews')}>
                            Reviews
                </button>
            </div>
            {/* <ProductDetailsPage data={data.productDetails} decodeHtml={decodeHtml}/> */}
        
            <div className='mt-4'>
                {active ==='productDetails' && <ProductDetailsPage data={data.productDetails} decodeHtml={decodeHtml} />}
                {active ==='reviews' && <ReviewPage reviews={data.review}/>}
                {/* {active ==='rfq' && <RfqPage id={id} />} */}
            </div>
        </div>
        {/* <Button variant='destructive' onClick={() =>{router.push('/edit-product')}}>Edit</Button> */}
    </>
  )
}

export default VendorSingleDetails