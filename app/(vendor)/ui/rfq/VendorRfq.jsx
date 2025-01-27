'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AddProduct from '../product/AddProduct';

const VendorRfq = ({ data }) => {
  const [addProduct, setAddProduct] = useState(false); // Default to false so VendorRfq shows first
  return (
    <div>
      {addProduct ? (
        <AddProduct userId={data?.data?.user?._id} />
      ) : (
        <div className='bg-white dark:bg-slate-800 py-4 px-4 rounded-lg shadow-lg overflow-x-auto mt-2 dark:text-white'>
          {/* Button to toggle AddProduct */}
        

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
            <div>
              <p className='text-sm text-gray-600 dark:text-white'>Product Name</p>
              <p className='text-sm text-gray-600 font-semibold dark:text-white pt-2'>
                {data?.data?.user?.product}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-600 dark:text-white'>Product Category</p>
              <p className='text-sm text-gray-600 font-semibold dark:text-white pt-2'>
                {data?.data?.user?.categories.map((category) => (
                  <p key={category.id}>{category.name}</p>
                ))}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-600 dark:text-white'>Product Description</p>
              <p className='text-sm text-gray-600 font-semibold dark:text-white pt-4 mt-2 border border-gray-100 p-4 rounded-lg'>
                {data?.data?.user?.description}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-600 dark:text-white'>Request for Quotation Document</p>
              <p className='text-sm font-semibold dark:text-white text-orange-300 underline pt-2'>
                <a href={data?.data?.user?.document?.url} target="_blank">
                  View Document
                </a>
              </p>
            </div>
            <div>
                <Button onClick={() => setAddProduct(true)} variant='destructive'>Add Product</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorRfq;
