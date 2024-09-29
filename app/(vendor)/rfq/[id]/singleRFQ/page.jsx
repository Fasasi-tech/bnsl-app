// 'use client'
// import React from 'react'
// import { useSingleRfqQuery } from '../../../../ui/utils/slices/usersApiSlice'
// import LoaderBtn from '../../../../ui/utils/LoaderBtn'

// const page = ({params}) => {
//     const {id} = params;
//     const {data, isLoading, error} = useSingleRfqQuery(id)

//     if (isLoading){
//         return <LoaderBtn />
//     }

//     if (error){
//         return <p>{error?.data?.message}</p>
//     }
//   return (
//     <div>

//     </div>
//   )
// }

// export default page