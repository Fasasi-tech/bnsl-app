'use client'
import React, {useState} from 'react'
import Image from 'next/image';
import EditVendor from './EditVendor';
import { Button } from '@/components/ui/button'
import banner from './../../../../public/banner.png'
import { LuSplitSquareVertical } from "react-icons/lu";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import VendorProduct from './VendorProduct';
import { useDeleteVendorMutation } from '@/app/ui/utils/slices/usersApiSlice';
import DeleteDialog from './DeleteDialog';
import { useToast } from '@/components/ui/use-toast';
import { useRouter} from 'next/navigation'
import {useSelector} from 'react-redux'

const VendorProfile = ({data, product, totalPages, page, setPage,  isFetching}) => {
    
    const {userInfo} = useSelector((state) =>state.auth)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
      const [deleteVendor]= useDeleteVendorMutation()
    const [selectedUser, setSelectedUser] = useState(null)
    const { toast } = useToast()
    const result= data?.data?.user;
    const router = useRouter()


    const handleDelete = async ()=>{
        try{
          const response=await deleteVendor(result._id)
          console.log('Delete Response:', response);
          toast({
            description: "Vendor has been deleted successfully"
          })
          router.push('/vendor')
        // alert('vendor deleted')
        }catch(error){
            const errorMessage = error?.data?.message || 'There was an error deleting this vendor';
            toast({
              description:errorMessage,
              variant:"destructive"
            })
        }
      }
  return (
    <div className='relative' >
        <div className=" rounded-lg shadow-md bg-white w-full mb-4 h-[24rem]">
            <div className='flex flex-col  items-center '>
                <div className=" bg-cover bg-center">
                    <Image
                        alt="banner"
                        src={banner}
                        quality={100}
                        style={{
                            objectFit: 'cover',
                          }}
                          className='h-40 rounded-t-lg'

                    />
                </div>
                <div className="w-40 h-40 absolute gap-2 top-32 left-8">
                    {result.logo?.url ? (
                        <Image
                        src={result.logo.url}
                        alt=''
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg border-4 border-green-300 max-w-full h-auto "
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-green-200 text-white  font-bold rounded-md">
                            <p className='text-4xl lg:text-6xl rounded-full bg-green-400 font-serif'></p>  
                        </div>
                    )}
                    
                </div>
            </div>
            <div className='absolute top-[12rem] left-56'>
                <h3 className='font-medium text-xl text-gray-500'>{`${result.name}`}</h3>
                <div className='flex items-center gap-2 text-gray-400' >
                    <LuSplitSquareVertical />
                    <p className='font-medium text-gray-400'>{result.user.role}</p>
                </div>
                <div className='flex items-center gap-2 text-gray-400'>
                    <FaLocationCrosshairs /> 
                    <p className='font-medium text-gray-400'>{result?.city}</p>
                </div>
                <div className='flex items-center gap-2 text-gray-400'>
                    <FaRegCalendarAlt /> 
                    <p className='font-medium text-gray-400'>joined {formatDate(result.user.createdAt)}</p>
                </div> 
            </div>
        </div>
    <div className="  w-full  mt-4 flex flex-wrap lg:flex-nowrap justify-between gap-4">
        <div className=" items-center gap-4 p-8  py-4  rounded-lg shadow-md bg-white w-full lg:w-1/3">
            <div>
                <h3 className='text-gray-400 border-b text-lg font-semibold border-gray-200 pt-2 pb-2'>Business Details</h3>
            
                <div className="flex items-center justify-start gap-4 py-2">
                    <p className='text-gray-500 font-semibold text-sm'>Business Name:</p>
                    <p className='text-sm text-gray-400'>{`${result.name}`}</p>
                </div>
                <div className="flex items-center justify-start gap-4 py-2">
                    <p className='text-gray-500 font-semibold text-sm'>Description:</p>
                    <p className='text-sm text-gray-400'>{`${result.description}`}</p>
                </div>
                <div className="flex items-center justify-start gap-4 py-2">
                    <p className='text-gray-500 font-semibold text-sm'>City:</p>
                    <p className='text-sm text-gray-400'>{`${result?.city}`}</p>
                </div>
                <div className="flex items-center justify-start gap-4 py-2">
                    <p className='text-gray-500 font-semibold text-sm'>Address:</p>
                    <p className='text-sm text-gray-400'>{`${result?.address}`}</p>
                </div>
                <div className="flex items-center justify-start gap-4 py-2">
                    <p className='text-gray-500 font-semibold text-sm'>Vendor Class:</p>
                    <p className="text-sm text-gray-400"> {result.vendor_class}</p>
                </div>
                <h3 className='text-gray-400 border-b text-lg font-semibold border-gray-200 pt-2 pb-2'>Vendor Details</h3>
                <div className="flex items-center justify-start gap-4 py-2">
                    <p className='text-gray-500 font-semibold text-sm'>First Name:</p>
                    <p className='text-sm text-gray-400'>{`${result.user.firstName}`}</p>
                </div>
                <div className="flex items-center justify-start gap-4 py-2">
                    <p className='text-gray-500 font-semibold text-sm'>Last Name:</p>
                    <p className='text-sm text-gray-400'>{`${result.user.lastName}`}</p>
                </div>
                <div className="flex items-center justify-start gap-4 py-2">
                    <p className='text-gray-500 font-semibold text-sm'>Status:</p>
                    <p className="text-sm text-gray-400"> {result.user.role}</p>
                </div>
                <div className="flex items-center justify-start gap-4 py-2">
                    <p className='text-gray-500 font-semibold text-sm'>Email:</p>
                    <p className="text-sm text-gray-400"> {result.user.email}</p>
                </div>
                <div className="flex items-center justify-start gap-4 pb-2">
                    <p className='text-gray-500 font-semibold text-sm'>Status:</p>
                    <p className="text-sm text-gray-400"> {result.user.active ? 'Active' : 'In-active'}</p>
                </div>
            </div>
            {userInfo && (userInfo.data.user.role==='admin' || userInfo.data.user.role==='superAdmin') && (<div className='pt-8 flex items-center gap-4 md:gap-8 justify-start'>
                <Button variant='destructive' onClick={() => setSelectedUser(result)} > Edit </Button>
                {/* <Button variant='' onClick={handleDelete}>Delete</Button> */}
                <DeleteDialog handleDelete={handleDelete} />
            </div>)}
        </div>

        <div className='w-full lg:w-2/3'>
            <VendorProduct product={product} totalPages={totalPages} page={page} setPage={setPage}  isFetching={ isFetching} />
        </div>
       
       
    </div>
       <p className='hidden'>{selectedUser && <EditVendor user={selectedUser} onClose={() => setSelectedUser(null)}/>  }</p>
      
  </div>
  )
}

export default VendorProfile