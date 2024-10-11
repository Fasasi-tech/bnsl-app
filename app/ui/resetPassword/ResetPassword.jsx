'use client'
import React, {useState} from 'react'
import { useRouter} from 'next/navigation'
import Image from 'next/image'
import Logo from '../../../public/bnsl.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Formik } from 'formik'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link'
import { useForgotPasswordMutation, useResetPasswordMutation } from '../utils/slices/usersApiSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../utils/Loader'
import { useSearchParams } from 'next/navigation'


const ResetPassword = () => {

    const [showPassword, setShowPassword] =useState(false)

    const handleToggle = ()=>{
        setShowPassword(!showPassword)
      }

    const searchParams = useSearchParams()
    const token= searchParams.get('token')
   

    const [resetPassword, {isLoading}] = useResetPasswordMutation()

    
    const handleSubmit = async (values, {setSubmitting, resetForm}) =>{
        try {

            const {confirm_password, ...otherValues} = values
            const result=await resetPassword({token, data:otherValues}).unwrap()
            setSubmitting(true)
            toast.success(result?.message)
            resetForm()

        } catch (err){
            
            alert(err.data?.message || err.error)

        }
      }

  return (
    <div className='items-center justify-center h-screen flex flex-col'>
         <div className='bg-white w-full md:w-[42%] lg:w-1/3 rounded-lg pt-6 px-6  pb-16'>
            <div className='w-full h-16 items-center justify-center flex'>
                <Image
                    src={Logo}
                    alt='Image'
                    className='w-24'
                />
            </div>
            <p className='mt-12 text-2xl  text-green-500'>Reset Password 🔒</p>
            <p className='mt-4 text-gray-500'>Enter your email and we'll send you instructions to reset your password</p>
            <Formik initialValues={{
                password:'',
                confirm_password:''

            }}
            
            validate ={(values) =>{
                const errors={}
                
                if (!values.password){
                    errors.password='Required'
                }

                if (!values.confirm_password){
                    errors.confirm_password='Required'
                }

                if (values.confirm_password !== values.password){
                    errors.confirm_password = 'password does not match!'
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

                <form className='mt-8' onSubmit={handleSubmit}>
                    <div className='relative'>
                        <label className='block text-base mb-2 text-gray-500 pl-2 '>New Password</label>
                        <Input
                            type={showPassword ? 'text':'password'}
                            id='password'
                            name='password'
                            values={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='...........'
                        />
                        <div className='z-50 absolute top-10 right-2'>
                            <button type='button' onClick={handleToggle}>{showPassword ? <FiEyeOff className='text-2xl text-[#83ed6b] '/> : <FiEye className='text-2xl text-[#83ed6b]' />  }</button> 
                        </div>
                        {touched.password && errors.password ?<div className='text-red-500 pl-2 font-semibold'>{errors.password}</div>: null}
                    </div>
                    <div  className='mt-4 relative'>
                        <label className='block text-base mb-2 text-gray-500 pl-2 '>Confirm Password</label>
                        <Input
                            type={showPassword ? 'text':'password'}
                            id='confirm_password'
                            name='confirm_password'
                            values={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='..........'
                        />
                        <div className='z-50 absolute top-10 right-2'>
                            <button type='button' onClick={handleToggle}>{showPassword ? <FiEyeOff className='text-2xl text-[#83ed6b] '/> : <FiEye className='text-2xl text-[#83ed6b]' />  }</button> 
                        </div>
                        {touched.confirm_password && errors.confirm_password ?<div className='text-red-500 pl-2 font-semibold'>{errors.confirm_password}</div>: null}
                    </div>
                    <div className='mt-4'>
                        <Button variant='destructive' type='submit'className={` ${ isSubmitting? 'opacity-50 cursor-not-allowed':''} `} disabled={ isSubmitting}> {isSubmitting ? <Loader /> : 'Set new password'}</Button>
                    </div>
                     <div className='mt-4'>
                        <p className='text-sm block text-green-500'>
                            <Link href='/'>
                                <span className='flex items-center justify-center gap-2'><IoIosArrowBack/> Back to login </span>
                                </Link>
                        </p>
                    </div>
                       
                    
                </form>)}
            </Formik>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    </div>
  )
}

export default ResetPassword