'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, {useState} from 'react'
import {Select, SelectContent, SelectItem,  SelectTrigger,SelectValue,} from "@/components/ui/select"
import { Formik } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CiMail, CiPhone } from "react-icons/ci";
import { AiOutlineTeam } from "react-icons/ai";
import { useEditUserMutation } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import { useToast } from '@/components/ui/use-toast';

const EditUser = ({user, onClose}) => {

    const [editUser] = useEditUserMutation()
    const { toast } = useToast()
    
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('Submitting form with values:', values);
        try {
          const res = await editUser({ id: user._id, ...values }).unwrap();
          console.log(res);
          setSubmitting(false);
        //   setModalMessage('User updated successfully!');
        toast({
            title: "Success",
            description: 'User updated successfully!',
          });
          resetForm();
          onClose();
        } catch (err) {
          console.log(err);
          toast({
            title: "Error",
            description: err.data?.message || err.error,
            variant: "destructive",
          });
          setSubmitting(false);
        }
      };
  return (
    <>
        <Dialog open={true} onOpenChange={onClose}>
            <DialogTrigger>
                <Button  variant='destructive'>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Edit User Information.
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        firstName: user.firstName || "",
                        lastName: user.lastName || "",
                        role: user.role || "",
                        phone: user.phone || "",
                        active: user.active || ""
                    }}

                    validate={(values) =>{
                        const errors={}

                          return errors;


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
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-2">
                <div className='grid-cols-4 items-center gap-4 relative'>
                  <Label htmlFor="firstName">
                    First Name
                  </Label>
                  <Input
                    type='text'
                    name="firstName"
                    id="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='First Name'
                    className="col-span-3 mt-2 pl-8"
                    readOnly
                  />
                  <div className='z-50 absolute top-11 left-2'>
                    <AiOutlineTeam className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 py-2">
                <div className='grid-cols-4 items-center gap-4 relative'>
                  <Label htmlFor="lastName">
                    Last Name
                  </Label>
                  <Input
                    type='text'
                    name="lastName"
                    id="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Last Name'
                    className="col-span-3 mt-2 pl-8"
                    readOnly
                  />
                  <div className='z-50 absolute top-11 left-2'>
                    <AiOutlineTeam className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className='grid gap-4 py-2'>
                <div className='grid-cols-4 items-center gap-4'>
                  <Label htmlFor="role" >
                    Role
                  </Label>
                  <Select
                    name="role"
                    id="role"
                    value={values.role}
                    onValueChange={(value) => setFieldValue('role', value)}
                    onBlur={handleBlur}
                  >
                    <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="none">Select a role</SelectItem> 
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                </Select>
                </div>
              </div>

              <div className="grid gap-4 py-2">
                <div className='grid-cols-4 items-center gap-4 relative'>
                  <Label htmlFor="phone">
                    Phone
                  </Label>
                  <Input
                    type='text'
                    name="phone"
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Phone'
                    className="col-span-3 mt-2 pl-8"
                    readOnly
                  />
                  <div className='z-50 absolute top-11 left-2'>
                    <CiPhone className="text-gray-400" />
                  </div>
                  {touched.phone && errors.phone ? (
                    <div className='text-red-500 pl-2 text-sm font-semibold'>{errors.phone}</div>
                  ) : null}
                </div>
              </div>
              <Button variant='destructive' type='submit' className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isSubmitting ?<LoaderBtn/> : 'Submit'}
              </Button>
            </form>
          )}
                    
                </Formik>
            </DialogContent>
            
        </Dialog>
      
    </>
  )
}

export default EditUser