'use client'
import React from 'react'
import { useNotificationStatsQuery } from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader'
import { toZonedTime } from 'date-fns-tz';
// import utcToZonedTime from 'date-fns-tz/utcToZonedTime';


const Notification = () => {
    const {data:stats, isLoading:statsLoading, error:statsError} = useNotificationStatsQuery()

    if (statsLoading){
        return <Loader />
    }

    if (statsError){
        return <p>{statsError?.message}</p>
    }

    const timeAgo = (dateString) => {
        const utcDate = new Date(dateString);
        // const watDate = toZonedTime(utcDate, 'Africa/Lagos');
        // const now = new Date();
        const watDate = toZonedTime(utcDate, 'Africa/Lagos');
        const diffInSeconds = Math.floor((new Date() - watDate) / 1000);
        
        // const past = new Date(dateString);
        // const diffInSeconds = Math.floor((now - watDate) / 1000);
    
        const seconds = diffInSeconds % 60;
        const minutes = Math.floor((diffInSeconds / 60) % 60);
        const hours = Math.floor((diffInSeconds / 3600) % 24);
        const days = Math.floor(diffInSeconds / 86400);
    
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };

    const colors = ['bg-blue-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-orange-500'];

  return (
    <div>
        <div className='w-full  h-full bg-white rounded-md shadow-lg p-4'>
                <p className='text-gray-500 font-semibold text-lg mb-4'>Notifications</p>
                {stats.data.user.map((p,i) =>(
                    <div key={i} className="mb-10  flex gap-2 ">
                        <div className={`w-3 h-3  ${colors[i%colors.length]} rounded-full mt-1.5 `}></div>
                        <div>
                            <p className=' text-gray-400 font-bold'>{p.title}</p>
                            <p className='text-sm text-gray-400'>{p.message}</p>
                            <p className='text-xs text-orange-300 font-bold'>{timeAgo(p.createdAt)}</p>
                        </div>
                    </div>
                ))
                
                }
                
            </div>
    </div>
  )
}

export default Notification