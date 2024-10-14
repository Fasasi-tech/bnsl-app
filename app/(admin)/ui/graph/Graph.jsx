'use client'
import Loader from '@/app/ui/utils/Loader'
import { useAnalyticsQuery, useNotificationStatsQuery } from '@/app/ui/utils/slices/usersApiSlice'
import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import Image from 'next/image'
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = () => {
    const {data, isLoading, error} = useAnalyticsQuery()
    // const {data:stats, isLoading:statsLoading, error:statsError} = useNotificationStatsQuery()

    if (isLoading ){
        return <Loader />
    }

    if (error){
        return <p>{error?.data?.message}</p>
    }

    const d= new Date().toISOString()
    const date= d.split('-')[0];




    const chartData = {
        labels: data.data.user.labels,
        datasets: [
            {
                label: `User Analytics For The Year ${date}`,
                data: data.data.user.data,
                fill:true,
                backgroundColor: 'rgba(255, 215, 125, 1)',
                borderColor: 'rgba(255, 165, 0, 1)',
                tension: 0.3,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
       
      };

  return (
    <div classNameName=' '>
        <div className='w-full'>
            <div className=' sm:w-80  md:w-full  h-96 bg-white rounded-md shadow-lg p-4'>
                <Line data={chartData} options={options} />
            </div>
        </div>
    </div>
    
  )
}

export default Graph