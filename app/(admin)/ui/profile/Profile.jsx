'use client'
import React, {useState} from 'react'
import { Button } from '@/components/ui/button';
import banner from '../../../../public/banner.png'
import { useUserprofileQuery } from '../../../ui/utils/slices/usersApiSlice'
import Loader from '../../../ui/utils/Loader'
import Image from 'next/image'
import EditProfile from './EditProfile';

const Profile = () => {
    const {data, isLoading, error} = useUserprofileQuery()
    // const [selectedUser, setSelectedUser] = useState(null)
    // const { toast } = useToast()

    if (isLoading){
        return <Loader />
    }

    if (error){
        return (<p>{error.data.message}</p>)
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };



    const result = data.data.user
    const initials = `${result.firstName?.slice(0, 1).toUpperCase()} ${result.lastName?.slice(0, 1).toUpperCase()}`;
  return (
    <div className='relative'>
         <div className=" rounded-lg shadow-md bg-white dark:bg-slate-800 w-full mb-4  h-[28rem] md:h-[22rem] lg:h-[20rem]">
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
                <div className="w-36 h-36 md:w-40 md:h-40 absolute gap-2 top-32 left-8">
                  { result?.image?.url ? (
                    <Image
                      alt="profile image"
                      src={result?.image.url}
                      className="w-full h-full rounded-md"
                      width={160}
                      height={160}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-orange-200 text-white font-bold rounded-md">
                      <p className="text-4xl lg:text-6xl font-serif">
                        {`${initials}`}
                      </p>
                    </div>
                  )}
                </div>


            </div>
            <div className='absolute top-[12rem] left-[12rem] md:left-56'>
                <h3 className='font-medium text-sm md:text-2xl text-gray-500'>{`${result.firstName} ${result.lastName}`}</h3>
                <p className='bg-gray-100 mt-4 text-gray-400 inline-block px-4 rounded-sm font-medium'>{result.role}</p>
            </div>
        </div>
        <div className=" items-center gap-4 mt-4 bg-white rounded-lg p-4">
       
       <div className=''>
         <h3 className='text-gray-400 border-b text-lg font-semibold border-gray-200 pt-2 '>Details</h3>
         <div className="flex items-center justify-start gap-4 py-2">
             <p className='text-gray-500 font-semibold text-sm'>First Name:</p>
             <p className='text-sm text-gray-400'>{`${result.firstName}`}</p>
         </div>
         <div className="flex items-center justify-start gap-4 pb-2">
             <p className='text-gray-500 font-semibold text-sm'>Last Name:</p>
             <p className='text-sm text-gray-400'>{`${result.lastName}`}</p>
         </div>
         <div className="flex items-center justify-start gap-4 pb-2">
             <p className='text-gray-500 font-semibold text-sm'>Email:</p>
             <p className='text-sm text-gray-400'>{`${result.email}`}</p>
         </div>
         <div className="flex items-center justify-start gap-4 pb-2">
             <p className='text-gray-500 font-semibold text-sm'>Role:</p>
             <p className='text-sm text-gray-400'>{`${result.role}`}</p>
         </div>
         <div className="flex items-center justify-start gap-4 pb-2">
             <p className='text-gray-500 font-semibold text-sm'>Status:</p>
             <p className="text-sm text-gray-400"> {result.active ? 'Active' : 'Inactive'}</p>
         </div>
         <div className="flex items-center justify-start gap-4 pb-2">
             <p className='text-gray-500 font-semibold text-sm'>Date Joined:</p>
             <p className="text-sm text-gray-400"> {formatDate(result.createdAt)}</p>
         </div>
       </div>
       <div className='pt-4 flex items-center gap-4 md:gap-8 justify-start'>
         <EditProfile data={result} />
     </div>
     {/* <p className='hidden'>{selectedUser && <EditProfile user={selectedUser} onClose={() => setSelectedUser(null)}/>  }</p> */}
     </div>
    </div>
  )
}

export default Profile