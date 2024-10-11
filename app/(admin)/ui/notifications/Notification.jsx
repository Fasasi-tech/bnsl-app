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
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode';

const Notifications = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const router = useRouter();
    const {userInfo} = useSelector((state) => state.auth)
    
    const ITEMS_PER_PAGE= 10;
    const { data: notifications, refetch, isLoading, isFetching, error } = useNotificationsQuery({ page, limit: ITEMS_PER_PAGE, search }, { refetchOnMountOrArgChange: true });
    const { setNotificationCount } = useStateContext();

    useEffect(() => {
        // Reset notification count when the notification page is opened
        setNotificationCount(0);
        localStorage.setItem('notificationCount', '0'); // Reset in localStorage

        // Refetch notifications when the page is opened
        refetch();
    }, [refetch, setNotificationCount]);

   
    if (isLoading) {
        return <Loader />;
    }


    if (error) {
        return <div className='font-bold text-green-300'>{error?.data?.message}</div>;
    }



    const result = notifications?.data?.user?.notifications;
    const totalPages= Math.ceil(notifications?.data?.user?.result/ ITEMS_PER_PAGE);

    const batchSize = 5; // Number of pages to show in each batch
    const startPage = Math.floor((page - 1) / batchSize) * batchSize + 1;
    const endPage = Math.min(startPage + batchSize - 1, totalPages);
    
    if (result?.length === 0) {
        return <div className='font-bold text-green-300'>No notifications available.</div>;
    }

    const timeAgo = (dateString) => {
        const utcDate = new Date(dateString);
        const watDate = toZonedTime(utcDate, 'Africa/Lagos');
        const diffInSeconds = Math.floor((new Date() - watDate) / 1000);
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
        <div className="flex justify-end gap-2 mt-4">
        {/* Previous button */}
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="bg-green-300 text-white py-1 px-3 rounded-full disabled:opacity-50"
                    isLoading={isFetching}
                >
                    <FaAngleLeft />
                </button>

                {/* Calculate the start and end pages to display only 3 buttons */}
                {(() => {
                    const startPage = Math.max(1, page - 1);
                    const endPage = Math.min(totalPages, startPage + 2);

                    return [...Array(endPage - startPage + 1)].map((_, index) => {
                    const currentPage = startPage + index;
                    return (
                        <Button
                        variant="secondary"
                        key={currentPage}
                        onClick={() => setPage(currentPage)}
                        className={classNames(
                            'px-3 rounded',
                            {
                            'bg-green-300 text-white': page === currentPage,
                            'bg-gray-200': page !== currentPage,
                            },
                            'mx-1'
                        )}
                        isLoading={isFetching}
                        >
                        {currentPage}
                        </Button>
                    );
                    });
                })()}

                {/* Next button */}
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
