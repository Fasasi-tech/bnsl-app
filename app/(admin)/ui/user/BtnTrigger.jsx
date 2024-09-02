

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
import {Select, SelectContent,  SelectItem,  SelectTrigger,SelectValue,} from "@/components/ui/select"

const BtnTrigger = () => {
  const [preview, setPreview] = useState('');
  const [CreateUser, { isLoading }] = useCreateUserMutation();

  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Submitting form with values:', values); // Debugging log
    try {
      const res = await CreateUser(values).unwrap();
      console.log(res);
      setSubmitting(false);
      toast.success('User created successfully!');
      router.push('/users')
      resetForm();
    } catch (err) {
      console.log(err);
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
            firstName: "",
            lastName: "",
            role: "",
            email: "",
            phone: "",
            image: ""
          }}
          validate={(values) => {
            const errors = {};

            if (!values.firstName) {
              errors.firstName = 'Required';
            }

            if (!values.lastName) {
              errors.lastName = 'Required';
            }

            if (!values.role) {
              errors.role = 'Required';
            }

            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.phone) {
              errors.phone = 'Phone number is required.';
            } else {
              if (values.phone.length !== 11 || !/^0\d{10}$/.test(values.phone)) {
                errors.phone = 'Invalid phone number!. ';
              }
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
                  />
                  <div className='z-50 absolute top-11 left-2'>
                    <AiOutlineTeam className="text-gray-400" />
                  </div>
                  {touched.firstName && errors.firstName ? (
                    <div className='text-red-500 pl-2 font-semibold'>{errors.firstName}</div>
                  ) : null}
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
                  />
                  <div className='z-50 absolute top-11 left-2'>
                    <AiOutlineTeam className="text-gray-400" />
                  </div>
                  {touched.lastName && errors.lastName ? (
                    <div className='text-red-500 pl-2 font-semibold'>{errors.lastName}</div>
                  ) : null}
                </div>
              </div>

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
                  {touched.role && errors.role ? (
                    <div className='text-red-500 pl-2 font-semibold'>{errors.role}</div>
                  ) : null}
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
                  />
                  <div className='z-50 absolute top-11 left-2'>
                    <CiPhone className="text-gray-400" />
                  </div>
                  {touched.phone && errors.phone ? (
                    <div className='text-red-500 pl-2 font-semibold'>{errors.phone}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4 mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded cursor-pointer"
                >
                  <BsCloudUpload className="text-2xl text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Drag your image here</span>
                  <span className="text-xs text-gray-400">(Only *.jpeg and *.png images will be accepted)</span>
                </label>
              </div>

              {preview && (
                <div>
                  <img src={preview} alt="Selected File" className='w-[300px] h-[300px]' />
                </div>
              )}

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

