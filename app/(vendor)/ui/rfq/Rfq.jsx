'use client'
import React, {useState} from 'react'
import { useRfqvendorQuery } from '../../../ui/utils/slices/usersApiSlice'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Loader from '../../../ui/utils/Loader'
import RFQAction from './RFQAction'
import { Button } from '@/components/ui/button'
import { HiDotsHorizontal } from 'react-icons/hi'
import EditProduct from '../product/EditProduct'
import AddProduct from '../product/AddProduct'
import Link from 'next/link'


const Rfq = () => {

    const {data, isLoading, error} = useRfqvendorQuery()
    const [editing, setIsEditing] = useState(true)
    const [selected, setSelected] = useState(null)

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p className='font-semibold'>{error?.message}</p>
    }

  

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
  return (
    <>
        <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto'>    
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-1/6'>Product</TableHead>
                        <TableHead className='w-1/6'>Created At</TableHead>
                        <TableHead className='w-1/6'>Actions</TableHead>
                    
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data.user.map((i, index) =>(
                        
                        <TableRow key={index}>
                            <TableCell className="w-1/6 text-sm">
                            {i.product}
                            </TableCell>
                            <TableCell className="w-1/6 text-sm ">
                                {formatDate(i.createdAt)}
                            </TableCell>
                            <TableCell className="w-1/6 text-sm ">
                                {/* <RFQAction userId={i._id}/> */}
                                {/* <Button onClick={() => {setIsEditing(false); setSelected(i._id)}} variant='outline'><HiDotsHorizontal /></Button> */}
                                <Link href={`/rfq/${i._id}/singleRFQ`}><Button variant='outline'><HiDotsHorizontal /></Button></Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>) 
        {/* <AddProduct userId={selected}/> */}
    </>
  )
}

export default Rfq