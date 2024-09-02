'use client'
import React from 'react'
import { useVendorsLogQuery } from '@/app/ui/utils/slices/usersApiSlice'

const Audit = () => {
    const ITEMS_PER_PAGE = 10;

    const [page, setPage] = useState(1)
    const [search,  setSearch] = useState('')
    const [sort, setSort] = useState('')
    const {data, isLoading, isFetching, error} = useVendorsLogQuery({page, limit:ITEMS_PER_PAGE, search})
 
    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p className='text-green-300 font-semibold '>{`${error.message}`}</p>
    }
  return (
    <div>Audit</div>
  )
}

export default Audit