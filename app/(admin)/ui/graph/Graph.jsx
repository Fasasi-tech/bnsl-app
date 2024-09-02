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
        return <p>error</p>
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
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(129, 199, 132, 1)',
                tension: 0.3,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
       
      };

    //   const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500'];

  return (
    <div classNameName=' '>
        <div className='w-full'>
            <div className=' sm:w-80  md:w-full  h-96 bg-white rounded-md shadow-lg p-4'>
                <Line data={chartData} options={options} />
            </div>
            {/* <div className='w-full lg:w-[30%] h-full bg-white rounded-md shadow-lg p-4'>
                <p className='text-gray-500 font-semibold text-lg mb-4'>Notifications</p>
                {stats.data.user.map((p,i) =>(
                    <div key={i} className="mb-10  flex gap-2 ">
                        <div className={`w-3 h-3  ${colors[i%colors.length]} rounded-full mt-1.5 `}></div>
                        <div>
                            <p className=' text-gray-400 font-bold'>{p.title}</p>
                            <p className='text-sm text-gray-400'>{p.message}</p>
                            <p className='text-xs text-green-300 font-bold'>{timeAgo(p.createdAt)}</p>
                        </div>
                    </div>
                ))
                
                }
                
            </div> */}
        </div>
    </div>
    
  )
}

export default Graph