'use client'
import Image from 'next/image'
import React, {useState} from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import ProductDetailsPage from './ProductDetailsPage'
import ReviewsPage from './ReviewsPage'
import RfqPage from './RfqPages'


const SingleProduct = ({data, id}) => {

   
    const result= data.data.user
    const [active, setActive] = useState('productDetails')
    const decodeHtml = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
      };
const blurs='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACkAKQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAXEAEBAQEAAAAAAAAAAAAAAAAAAREC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AYBDIIyAiMlAABVQ4mHEVUOFDgKACKZAACBKgAIAAAIgQhkRaB6RaNUMFogLOJhxFXDiYqCmZGgACAFRStVBpaWloHoLQBaNLS0Q9LS0tA9LS0tUVpyp04KuKiIqILiomKgpgBAFTKgVTadRaoLS0rS0D0J0CHpaWjQFpWlpaB6WloUVqoiKgLi4iLiC4qJioKZgIEmqqaCaiqqKom1NotTaB6E6AWQJEBWikoARgcXERcBcXExcFXFQpFSADPAgmorSooM+mdadM+gZ1Fq+kVVLQQBoRhGSIyUI4DkA4uQpF8wFSNOYnmNOYKci5CkXIBYMVgxBFiK0sTYDHpn026jLqAy6Z1r1GdiqkHgBZKJGSGHgxQsOQ8VIAkXzCkacwD5jSQpFyAci5BIqQCwYrBgM7EWNbE2IrHqMuo36jPqKMOoixr1EWAzwLwCjBh4MRksGHh4oUipBIuQBI0kTI0kA5GkhcxcgHIqQSKkAsGKwYDOxNjSxNgMeoz6jaxn1BWNiLG1iLAZ4F4ARgwwiFh4ZyKFIuQpFyAci5CkXICpFyFIuQDkVIUipAGFigCLEWNLE2AysR1GtiLAY2JsaWJsFRgVgBiABDhwoqAcVCioCo0iIuAuLiYuCKhwooADIVNTV1NBnUVpUUGdTYupoJBgHMYAHDgAKioAC40gCouLgALhwBAwAKmpoAIqKACKmgAQAB/9k='
  return (
    <>
        <div className='w-full py-2 md:py-4 lg:py-16 px-2 md:px-4 lg:px-40  bg-white  dark:bg-slate-800 shadow-lg rounded-lg   mx-auto'>
            <div className='grid grid-cols-2 gap-4'>
                <div >
                    <Image
                        alt='product-img'
                        src={result.image.url}
                        width={400}
                        height={400}
                        className='rounded-lg'
                        placeholder="blur"
                        blurDataURL={blurs}
                    />
                    
                
                    
                </div>
                <div className=''>
                    <div className='border  border-t-0 border-x-0 pb-8 border-b border-dashed border-gray-500'>
                        <p className='text-sm  md:text-lg lg:text-3xl font-semibold font-mono'>{result.name}</p>
                        <p className='text-sm md:text-lg lg:text-2xl font-semibold mt-2 lg:mt-8'>
                        Price: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
                            result.price )}
                        </p>
                        <div className='flex items-center gap-2 mt-4'>
                            <Avatar>
                                <AvatarImage src={result.vendorDetails.logo.url} alt='vendor-image' />
                            </Avatar>
                            <p>{result.vendorDetails.name}</p>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <p className='text-gray-400 pb-2'>credit Term: {result?.creditTerm?.value}{result?.creditTerm?.unit}</p>
                        <p className='text-gray-400 pb-2'>Lead Time: {result?.leadTime?.value}{result?.leadTime?.unit}</p>
                    </div>
                    
                </div>
            </div>

        </div>
        <div className='w-full py-2 px-2 md:px-4 lg:px-40 bg-white dark:bg-slate-800 shadow-lg rounded-lg mx-auto mt-8'>
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
                <button className={active ==='rfq' ? 'font-semibold border-b-2 border-black inline-block':''} onClick={() => setActive('rfq')}>
                    Request for Quote
                </button>
            </div>
            <div className='mt-4'>
                {active ==='productDetails' && <ProductDetailsPage data={result.productDetails} decodeHtml={decodeHtml} />}
                {active ==='reviews' && <ReviewsPage reviews={result.review} id={result._id}/>}
                {active ==='rfq' && <RfqPage id={id} />}
            </div>
        </div>
    </>
  )
}

export default SingleProduct