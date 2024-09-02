'use client'
import Loader from '@/app/ui/utils/Loader'
import { usePolarQuery } from '@/app/ui/utils/slices/usersApiSlice'
import React from 'react'
import {Chart, RadialLinearScale, ArcElement, Title, Tooltip} from 'chart.js'
import { PolarArea } from 'react-chartjs-2';
Chart.register(RadialLinearScale, ArcElement, Title, Tooltip)

const Polar = () => {

    const {data, isLoading, error} = usePolarQuery()

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p>something went wrong!</p>
    }
    const aggregateResult = data.data.user.map((i) =>({
        label: i._id,
        count: i.count
    }))

    const labels= aggregateResult.map((data) => data.label) 
    const counts = aggregateResult.map((data) => data.count)

    const datas = {

        labels: labels ,
        datasets: [
          {
            label: '',
            data: counts,
            backgroundColor: [
              '#26501D',
              '#3D802E',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)',
              '#00FFFF',
              '#3D802C',
              '#FF00FF',
              '#FFC0CB',
              '#FFD700',
              '#87CEEB',
              '#A52A2A'
            ],
          },
        ],
      };
    
    console.log(labels)
    console.log(counts)

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          }
        },
      };

  return (
    <div className='bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg'>
        <div className='sm:w-72 sm:h-72  md:w-[26rem] md:h-[26rem]'>
            <p className='text-gray-500 font-semibold text-lg mb-4'>Categories</p>
            <PolarArea data={datas} options={options}/>
        </div>

    </div>
  )
}

export default Polar