'use client'
import React, {useState} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HiDotsHorizontal } from "react-icons/hi";
import { useSingleRfqQuery } from '../../../ui/utils/slices/usersApiSlice';
import Loader from '../../../ui/utils/Loader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineTeam } from 'react-icons/ai';
import LoaderBtn from '../../../ui/utils/LoaderBtn';

const AdminRfqs = ({userId}) => {
    const [isOpen, setIsOpen] = useState(false)
    const {data, isLoading, error} = useSingleRfqQuery(userId, {skip:!isOpen})
  return (
    <Dialog Open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button variant='outline'><HiDotsHorizontal /></Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    RFQ Details
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                    Detailed information about the selected RFQ.
                </DialogDescription>
            </DialogHeader>
            {
                isLoading ?(
                    <Loader />
                ): error ?(
                    <p className='text-red-500 font-semibold'>{error?.data?.message}</p>
                ):(
                    <div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative'>
                            <Label htmlFor="name">
                            Customer
                            </Label>
                            <Input
                                type='text'
                                value={data?.data?.user?.buyer?.email}
                                className="col-span-3 mt-2 pl-8"
                                
                            />
                            </div>
                        </div>
                        <div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="name">
                                    Additional Information
                                </Label>
                                <Input
                                    type='text'
                                    value={data?.data?.user?.additionalInfo}
                                    className="col-span-3 mt-2 pl-8"
                                    
                                />
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <a 
                                    href={data?.data?.user?.document?.url}  
                                    target="_blank"  
                                    rel="noopener noreferrer"  
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View Document
                                </a>
                            </div>
                        </div>

                    </div>
                )
            }
        </DialogContent>
    </Dialog>
  )
}

export default AdminRfqs