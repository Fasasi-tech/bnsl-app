'use client'
import React, {useState} from 'react'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import Loader from '@/app/ui/utils/Loader';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import classNames from 'classnames';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const ProductHistory = () => {

    const ITEMS_PER_PAGE = 10;

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    if (isLoading){
        return <Loader />
    }

    if (error){
        return <p>{error.data.message}</p>
    }


    const dateString = (dateString) =>{
        const date = new Date(dateString)
        const options={
            weekday:"long", year:"numeric", month:"long", day:"numeric", 
        }

        return date.toLocaleString("en-US", options)
    }


  return (
    <div>ProductHistory</div>
  )
}

export default ProductHistory