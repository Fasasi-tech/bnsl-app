
'use client'
import React, { useEffect, useState } from 'react'
import socket from '@/app/ui/utils/socket'
import { useNotificationsQuery } from '@/app/ui/utils/slices/usersApiSlice'
import Loader from '@/app/ui/utils/Loader'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { toZonedTime } from 'date-fns-tz';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import classNames from 'classnames';
import { useStateContext } from '../../context/ContextProvider'


const Notifications = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
  

    const ITEMS_PER_PAGE= 10;
    const { data: notifications, refetch, isLoading, isFetching, isError } = useNotificationsQuery({ page, limit: ITEMS_PER_PAGE, search }, { refetchOnMountOrArgChange: true });
    const { setNotificationCount } = useStateContext();
    useEffect(() => {
        // Listen for new notifications
        setNotificationCount(0);
        socket.on('new-notification', () => {
            refetch(); // Refetch notifications when a new one is received
        });



        //Cleanup on component unmount
        return () => {
            socket.off('new-notification');
        };
    }, [refetch, setNotificationCount]);

   

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div className='font-bold text-green-300'>Something went wrong!</div>;
    }

    const result = notifications?.data?.user?.notifications;
    const totalPages= Math.ceil(notifications?.data?.user?.result/ ITEMS_PER_PAGE);

    if (result?.length === 0) {
        return <div className='font-bold text-green-300'>No notifications available.</div>;
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
    return (
        <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg overflow-x-auto mb-12'>
            {result?.map((notification, index) => (
                <div  className="border-gray-200 border-b p-4"  key={index}>
                    <div className='flex items-center gap-4 '>
                        <div>
                            <Avatar>
                                <AvatarImage src={notification.user?.image?.url} alt='avatar'/>
                                <AvatarFallback className='bg-green-300'></AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <p className='text-gray-500'>{notification.message}</p>
                            <p className='text-green-300 text-sm font-semibold'>{timeAgo(notification.createdAt)}</p>
                        </div>    
                    </div>    
                </div>
            ))}
            <div className="flex justify-end gap-2 mt-4"> {/* Added flex and gap-2 for spacing */}
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-green-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
                isLoading={isFetching}
            >
                <FaAngleLeft />
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <Button
                    variant="secondary"
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={classNames(
                    ' px-3 rounded',
                    {
                        'bg-green-300 text-white': page === index + 1,
                        'bg-gray-200': page !== index + 1,
                    },
                    'mx-1' // Added margin-x for spacing between buttons
            )}
                    isLoading={isFetching}
                >
                    {index + 1}
                </Button>
            ))}
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
    );
}

export default Notifications;
