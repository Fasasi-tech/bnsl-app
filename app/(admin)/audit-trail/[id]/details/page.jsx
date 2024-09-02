// 'use client'
// import React from 'react'
// import { useSingleVendorHistoryQuery } from '@/app/ui/utils/slices/usersApiSlice'
// import AuditLog from '@/app/(admin)/ui/auditLog/AuditLog'
// import Loader from '@/app/ui/utils/Loader'

// const page = ({params}) => {
//     const {id} = params
//     const {data, isLoading, error} = useSingleVendorHistoryQuery(id)

//     if(isLoading){
//         return <Loader />
//     }

//     if(error){
//         return <p className='font-bold text-green-300'>error</p>
//     }

//   return (
//     <div className='px-4 my-4 lg:px-8'>
//         <AuditLog data={data} />
//     </div>
//   )
// }

// export default page