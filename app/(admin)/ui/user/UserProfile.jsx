'use client'
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, {useState} from 'react'
import EditUser from './EditUser';
import { useActivateUserMutation, useDeleteUserMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { useToast } from '@/components/ui/use-toast';
import AlertDialogs from './AlertDialogs';
import { useRouter} from 'next/navigation'
import banner from './../../../../public/banner.png'

const UserProfile = ({data}) => {
    const [deleteUser, {isLoading, error, status}] = useDeleteUserMutation()
    const [activateUser] = useActivateUserMutation()
    const [selectedUser, setSelectedUser] = useState(null)
    const { toast } = useToast()
    const router = useRouter()

   

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
      
    const result=data.data.user
    const initials = `${result.firstName?.slice(0, 1).toUpperCase()} ${result.lastName?.slice(0, 1).toUpperCase()}`;

    const handleDelete =  async () => {
        try {
            const response = await deleteUser(result._id).unwrap();
            toast({
                     description: "User has been deleted successfully.",
              })

        } catch (error) {
            toast({
                            description: "There was an error deleting the user.",
                           variant: "destructive",
                     });
        }

      };

      const handleActivateUser = async() =>{
        try{
          const results=  await activateUser(result._id).unwrap()
            toast({
                description: `${results.data.user.message}`,
              })
        } catch(err){
            toast({
                description: `${err.message}`,
               variant: "destructive",
          });
        }

    }
      
  return (
    <div className='relative'>
   < div className=" rounded-lg shadow-md bg-white w-full mb-4 h-[20rem] ">
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
            {result.image?.url ? (
                <Image
                src={result.image.url}
                alt={`${result.firstName} ${result.lastName}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg border-4 border-green-300 max-w-full h-auto "
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-200 text-white  font-bold rounded-md">
                    <p className='text-4xl lg:text-6xl font-serif'>{`${initials}`}</p>  
                </div>
            )}
            
        </div>
        
    </div>
    <div className='absolute top-[12rem] left-56'>
        <h3 className='font-medium text-lg text-gray-500'>{`${result.firstName} ${result.lastName}`}</h3>
        <p className='bg-gray-100 mt-4 text-gray-400 inline-block px-4 rounded-sm font-medium'>{result.role}</p>
    </div>
    <div className=" items-center gap-4 mt-44 bg-white rounded-lg p-4">
       
      <div className=''>
        <h3 className='text-gray-400 border-b text-lg font-semibold border-gray-200 pt-8 '>Details</h3>
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
      <div className='pt-8 flex items-center gap-4 md:gap-8 justify-start'>
        <Button variant='destructive' onClick={() => setSelectedUser(result)} > Edit </Button>
        {result.active ? (<AlertDialogs handleDelete={handleDelete} />) : 
        <Button onClick={handleActivateUser}>
            Activate
        </Button> }
    </div>
    </div>
       <p className='hidden'>{selectedUser && <EditUser user={selectedUser} onClose={() => setSelectedUser(null)}/>  }</p> 
  </div>
  </div>
  )
}

export default UserProfile