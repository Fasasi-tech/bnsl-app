'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import Logo from '../../../public/bnsl.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Formik } from 'formik'
import Link from 'next/link'
import {useChangePasswordMutation} from '../utils/slices/usersApiSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderBtn from '../utils/LoaderBtn'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import {logout} from '@/app/ui/utils/slices/authSlice'


const ChangePassword = () => {

    const [showPassword, setShowPassword] =useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const handleToggle = ()=>{
        setShowPassword(!showPassword)
      }

      const [reset] = useChangePasswordMutation()
      
      const handleSubmit = async (values, {setSubmitting, resetForm}) =>{
        try {
            const res = await reset(values).unwrap();
            console.log(res)
            dispatch(logout())
            router.push('/')
            
              setSubmitting(false);
              toast.success('password reset successfully!');

              resetForm();
              
            

        } catch (err){
            console.log(err)
            toast(err.data?.message || err.error)
            setSubmitting(false);
        }
      }

  return (
    <div className='items-center justify-center  flex flex-col ' >
        <div className='bg-white w-full md:w-[42%] lg:w-1/4 rounded-lg pt-6 px-6  pb-16'>
            <div className='w-full h-16 items-center justify-center flex'>
                <Image
                    src={Logo}
                    alt='Image'
                    className='w-24'
                />
            </div>
            <p className='mt-12 text-2xl  text-green-500'>Welcome to BNSL! 👋</p>
            <p className='mt-4 text-gray-500'>Please sign-in to your account and start the adventure</p>
            <Formik initialValues={{
                currentPassword:'',
                password:''

            }}
            
            validate ={(values) =>{
                const errors={}

                if (!values.currentPassword){
                    errors.currentPassword='Required'
                }

                
                if (!values.password) {
                    errors.password = 'Required';
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
                    isSubmitting

                }) =>(

                <form className='mt-8' onSubmit={handleSubmit} >
                     <div className='mt-4 relative'>
                        <span className='flex items-center justify-between'><label className='block text-base mb-2 text-gray-500 pl-2 '>Current Password</label> <p className='text-sm block text-green-500'><Link href='/forgot-password'>Forgot password?</Link></p></span>
                        <Input
                        type= {showPassword ? 'text':'password'}
                        id='currentPassword'
                        name='currentPassword'
                        values={values.currentPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='................'
                        />
                        <div className='z-50 absolute top-10 right-2'>
                            <button type='button' onClick={handleToggle}>{showPassword ? <FiEyeOff className='text-2xl text-[#83ed6b] '/> : <FiEye className='text-2xl text-[#83ed6b]' />  }</button> 
                        </div>
                        {touched.currentPassword && errors.currentPassword ?<div className='text-red-500 pl-2 font-semibold'>{errors.currentPassword}</div>: null}
                    </div>
                    <div className='mt-4 relative'>
                        <span className='flex items-center justify-between'><label className='block text-base mb-2 text-gray-500 pl-2 '>New Password</label> <p className='text-sm block text-green-500'><Link href='/forgot-password'>Forgot password?</Link></p></span>
                        <Input
                        type= {showPassword ? 'text':'password'}
                        id='password'
                        name='password'
                        values={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='................'
                        />
                        <div className='z-50 absolute top-10 right-2'>
                            <button type='button' onClick={handleToggle}>{showPassword ? <FiEyeOff className='text-2xl text-[#83ed6b] '/> : <FiEye className='text-2xl text-[#83ed6b]' />  }</button> 
                        </div>
                        {touched.password && errors.password ?<div className='text-red-500 pl-2 font-semibold'>{errors.password}</div>: null}
                    </div>
                    <div className='mt-4'>
                        <Button variant='destructive' type='submit'className={` ${ isSubmitting? 'opacity-50 cursor-not-allowed':''} `} disabled={ isSubmitting}> {isSubmitting ? <LoaderBtn/> : 'Submit'}</Button>
                    </div>
                    
                </form>)}
            </Formik>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    </div>
  )
}

export default ChangePassword