'use client'
import React, {useReducer, useState, useEffect} from 'react'
import Image from 'next/image'
import Logo from '../../../public/bnsl.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../utils/slices/usersApiSlice'
import { setCredentials } from '../utils/slices/authSlice'
import { useRouter} from 'next/navigation'
import Link from 'next/link'
import Loader from '../utils/Loader'
import LoaderBtn from '../utils/LoaderBtn'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {


    const [showPassword, setShowPassword] =useState(false)

    const handleToggle = ()=>{
        setShowPassword(!showPassword)
      }

      const router = useRouter()
      const dispatch = useDispatch()

      const [login, {isLoading}] = useLoginMutation()
      const {userInfo} = useSelector((state) => state.auth)

       

        useEffect(() => {
            if (userInfo?.data?.user?.role ==='vendor') {
              router.push('/create-vendor');
            }

            else if (userInfo?.data?.user?.role ==='superAdmin'|| userInfo?.data?.user?.role ==='R.O.A' ||userInfo?.data?.user?.role ==='admin'){
                router.push('/profile')
            }

            else if(userInfo?.data?.user?.role ==='user'){
                router.push('/products')
            }

            else{
                router.push('/')
            }
          }, [router, userInfo]);

      const handleSubmit = async (values, {setSubmitting, resetForm}) =>{
        try {


            const res = await login(values).unwrap();
          
            
              setSubmitting(false);
              dispatch(setCredentials({ ...res }));
              resetForm();
           
         
              
            

        } catch (err){
           
            toast.error(err.data?.message || err.error)

        }
      }

     
  return (
    <div className='items-center justify-center h-screen flex flex-col ' >
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
                email:'',
                password:''

            }}
            
            validate ={(values) =>{
                const errors={}

                if (!values.password){
                    errors.password='Required'
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
                    isSubmitting

                }) =>(

                <form className='mt-8' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-base mb-2 text-gray-500 pl-2 '>Email</label>
                        <Input
                            type='text'
                            id='email'
                            name='email'
                            values={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Enter your email'
                        />
                            {touched.email && errors.email ?<div className='text-red-500 pl-2 font-semibold'>{errors.email}</div>: null}
                    </div>
                    <div className='mt-4 relative'>
                        <span className='flex items-center justify-between'><label className='block text-base mb-2 text-gray-500 pl-2 '>Password</label> <p className='text-sm block text-green-500'><Link href='/forgot-password'>Forgot password?</Link></p></span>
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
                    
                </form >)}
            </Formik>
        </div>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default Login