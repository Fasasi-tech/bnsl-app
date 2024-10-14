import React from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { HiDotsHorizontal } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import Link from 'next/link';

const Actions = ({userId}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline"><HiDotsHorizontal /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-32">
        <div className="grid gap-4">
          <div className="grid gap-2">
             <Link href={`/users/${userId}/profile`}><p className='text-sm text-gray-500 flex items-center justify-start gap-2 hover:text-orange-300'><IoEyeOutline className='text-lg text-orange-300' /> View</p></Link>
              {/* <p className='text-sm text-gray-500 flex items-center justify-start gap-2 hover:text-orange-300'><MdDeleteOutline className='text-lg  text-orange-300' /> Delete</p> */}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}


export default Actions