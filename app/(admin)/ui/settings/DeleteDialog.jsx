import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { MdOutlineDelete } from "react-icons/md";
  import { useDeleteGroupMutation } from '@/app/ui/utils/slices/usersApiSlice';
  import { useToast } from '@/components/ui/use-toast';

const DeleteDialog = ({userId}) => {
  const [deleteGroup] = useDeleteGroupMutation()
  const {toast} = useToast()

  const handleDeleteGroup = async () =>{
    try { await deleteGroup(userId)

      toast({
        description: 'Role deleted successfully!'
      })
     }
    catch (err){
      const errorMessage = err?.data?.message || 'There was an error deleting this product'
    toast({
      description:errorMessage,
      variant:"destructive"
    })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="text-xl flex items-center gap-2 text-red-500 cursor-pointer"><MdOutlineDelete /><span className='text-sm'>Delete</span></p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick ={handleDeleteGroup}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog