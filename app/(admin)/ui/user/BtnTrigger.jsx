
'use client'
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AiOutlineTeam } from "react-icons/ai";
import { Button } from '@/components/ui/button';
import { IoMdPersonAdd } from "react-icons/io";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CiMail, CiPhone } from "react-icons/ci";
import { BsCloudUpload } from 'react-icons/bs';
import { useCreateUserMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/app/ui/utils/Loader';
import { useRouter } from 'next/navigation';
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { useGroupQuery } from '@/app/ui/utils/slices/usersApiSlice';

const BtnTrigger = () => {
  const [preview, setPreview] = useState('');
  const [CreateUser, { isLoading }] = useCreateUserMutation();
  const {data:group, isLoading:loadingGroup, error:loadingError} = useGroupQuery()

  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
   
    try {
      const res = await CreateUser(values).unwrap();
     
      setSubmitting(false);
      toast.success('User created successfully!');
      router.push('/users')
      resetForm();
    } catch (err) {
     
      toast.error(err.data?.message || err.error);
      setSubmitting(false);
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file, setFieldValue);
    }
  };

  const convertToBase64 = (file, setFieldValue) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
      setFieldValue('image', reader.result);
    };
  };

  return (
    <>
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive">
          <p className='flex text-white items-center font-bold gap-2'>
            <IoMdPersonAdd className='text-white text-lg font-black' />Add New User
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] my-8 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className='text-gray-600'>
            Create User
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new user.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            email: "",
            group: ""
          }}
          validate={(values) => {
            const errors = {};

            if (!values.group) {
              errors.group = 'Required';
            }

            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
           

            return errors;
          }}
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
                  <Label htmlFor="email">
                    Email
                  </Label>
                  <Input
                    type='text'
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Email'
                    className="col-span-3 mt-2 pl-8"
                  />
                  <div className='z-50 absolute top-11 left-2'>
                    <CiMail className="text-gray-400" />
                  </div>
                  {touched.email && errors.email ? (
                    <div className='text-red-500 pl-2 font-semibold'>{errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className='grid gap-4 py-2'>
                <div className='grid-cols-4 items-center gap-4'>
                  <Label htmlFor="group" >
                    Role
                  </Label>
                  <Select
                    name="group"
                    id="group"
                    value={values.group}
                    onValueChange={(value) => setFieldValue('group', value)}
                    onBlur={handleBlur}
                  >
                     <SelectTrigger className='pl-4 py-6'>
                            <SelectValue placeholder="Role"/>   
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                                {
                                loadingGroup?(
                                    <Loader />
                                ): loadingError ? (
                                    <p>{loadingError.data.message}</p>
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
                  {touched.role && errors.role ? (
                    <div className='text-red-500 pl-2 font-semibold'>{errors.role}</div>
                  ) : null}
                </div>
              </div>
              <Button variant='destructive' type='submit' className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isSubmitting ? <Loader /> : 'Submit'}
              </Button>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default BtnTrigger;

