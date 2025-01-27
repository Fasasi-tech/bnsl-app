'use client'
import React, {useState, useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { HiDotsHorizontal } from "react-icons/hi";
import { useGroupQuery, useSingleUserQuery } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';
import { Formik, Form } from 'formik';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import AlertDialogs from './AlertDialogs';
import { useActivateUserMutation, useDeleteUserMutation, useEditUserMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { usePermissionsQuery } from '@/app/ui/utils/slices/usersApiSlice';
import { Label } from '@/components/ui/label';

const Actions = ({userId}) => {
  const {data, isLoading, error}= useSingleUserQuery(userId)
  const [deleteUser] = useDeleteUserMutation()
  const [activateUser] = useActivateUserMutation()
  const {data:group, isLoading:loadingGroup, error:loadingError} = useGroupQuery()
  const {data:permission, isLoading:loadingPermission, error:errorPermission}= usePermissionsQuery()
  const [editUser] = useEditUserMutation()

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDelete =  async () => {
    try {
      const response = await deleteUser(userId).unwrap();
      // toast({
      //   description: "User has been suspended successfully.",
      // })
      toast.success('user has been updated successfully!')

     


    } catch (error) {
      if (err?.data?.message) {
        toast.error(err?.data?.message);
        } else if (error?.data?.error) {
            toast.error(error?.data?.error);  // Handles error: "Values must be provided in the body."
        } else {
            toast.error('An unexpected error occurred');
        }
    }

  };

  const handleActivateUser = async() => {
    try {
      const results = await activateUser(userId).unwrap();
      console.log("User activated:", results); // Log success
      toast.success('user activated successfully')
    } catch(error) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
    } else if (error?.data?.error) {
        toast.error(error?.data?.error);  // Handles error: "Values must be provided in the body."
    } else {
        toast.error('An unexpected error occurred');
    }
    }
  };
  



  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        
    try {
      const res = await editUser({ id: data.data.user._id, ...values }).unwrap();
      console.log(res, 'res')
      console.log(values.permissions, 'permmissions')
      setSubmitting(false);
      toast.success('user updated successfully')
      resetForm();
    } catch (err) {
     
      // toast({
      //   title: "Error",
      //   description: err.data?.message || err.error,
      //   variant: "destructive",
      // });
      // setSubmitting(false);
      if (err?.data?.message) {
        toast.error(err?.data?.message);
    } else if (err?.data?.error) {
        toast.error(err?.data?.error);  // Handles error: "Values must be provided in the body."
    } else {
        toast.error('An unexpected error occurred');
    }
    }
  };

  return (
    <Dialog>
       {/* <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
      <DialogTrigger>
        <Button variant='outline'><HiDotsHorizontal/></Button>
      </DialogTrigger>
      <DialogContent className='overflow-auto min-h-[500px] max-h-[500px]'>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
          {isLoading ? (
            <Loader />
          ):error ?(
            <p>{error.data.message}</p>
          ):(
            <Formik
              initialValues={{
                email: data?.data?.user?.email || "",
                group:data?.data?.user?.group?._id||"",
                permissions:data?.data?.user?.permissions ||[],
                superAdmin:data?.data?.user?.superAdmin||"",
                active:data?.data?.user?.active||"",
                createdAt:data?.data?.user?.createdAt||""

              }}

              validate={(values) =>{
                const errors={}

                  return errors
                 }
               }

             onSubmit={handleSubmit}
            >
              {({
              values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue
            }) =>(
              <Form onSubmit={handleSubmit}>
                <div className='mt-2'>
                  <p className='text-sm font-medium text-gray-500 pb-2'>Email</p>
                  <Input
                    className='col-span-3 border border-gray-2 p-2 rounded-lg text-sm'
                    name="email"
                    id='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly
                  />
                </div>
                <div className=''>
                  <p className='text-sm font-medium text-gray-500 pb-2'>Role</p>
                  <Select
                    name='group'
                    value={values.group}
                    onValueChange={(value) => setFieldValue('group', value)}
                    onBlur={handleBlur}
                  >
                    <SelectTrigger className='col-span-3 border border-gray-2 p-2 rounded-lg text-sm '>
                        <SelectValue placeholder="Role"/>   
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Role</SelectLabel>
                            {
                              loadingGroup?(
                                <Loader />
                              ): loadingError ? (
                                <p>{error.data.message}</p>
                              ):
                              group?.data?.user?.map((i, index)=>(
                                <SelectItem key={index} value={i._id}>
                                  {i.name}
                                </SelectItem>
                              ))
                            }
                        </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className='mt-2'>
                  <p className='text-sm font-medium text-gray-500 pb-2'>Date created</p>
                  <Input
                    className='col-span-3 border border-gray-2 p-2 rounded-lg text-sm'
                    name="group"
                    id='group'
                    value={formatDate(values.createdAt)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly
                  />
                </div>
                <div className="text-xl font-semibold">User Permissions</div>
                <div>
                  {loadingPermission ? (
                    <Loader />
                  ) : errorPermission ? (
                    <p className="text-red-500">{errorPermission.data.message}</p>
                  ) : (
                      <div>
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                          <table className="min-w-full table-auto text-left">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-sm font-medium text-gray-600">Permissions</th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-600">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {permission.data.user
                                .map(perm => (
                                  <tr key={perm._id} className="border-t border-gray-200">
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {perm.name}
                                    </td>
                                    <td className="px-4 py-2">
                                      <Checkbox
                                        // id={perm._id}
                                        // name={perm._id}
                                        checked={values.permissions.includes(perm._id)}
                                        onCheckedChange={() => {
                                          if (values.permissions.includes(perm._id)) {
                                            setFieldValue('permissions', values.permissions.filter((p) => p !== perm._id));
                                          } else {
                                            setFieldValue('permissions', [...values.permissions, perm._id]);
                                          }
                                        }}
                                      />
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                    
                  )}
                </div>
                <div className='flex gap-2 justify-between mt-4'>
                  {data?.data?.user?.active ? <AlertDialogs handleDelete={handleDelete}/>:
                    <Button type='submit' onClick={handleActivateUser} >
                      Activate
                    </Button> 
                  }
                  <Button type='submit' variant='destructive' className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Save changes
                  </Button>
                </div>
              </Form>
            )}

            </Formik>
          )}
           
      </DialogContent>
        
    </Dialog>
  )
}


export default Actions